export const getRecipeSummary = async (recipeId: string) => {
    const apiKey = process.env.API_KEY
    if (!apiKey) {
      throw new Error("API key not found");
    }
  
    const url = new URL(
      `https://api.spoonacular.com/recipes/${recipeId}/summary`
    );
    const params = { apiKey: apiKey };
    url.search = new URLSearchParams(params).toString();
    const fetch = require('node-fetch');
    const response = await fetch(url.toString());
    const json = await response.json();
    return json;
  };

  export const searchRecipes = async (searchTerm: string, page: number) => {
    const apiKey = process.env.API_KEY
    if (!apiKey) {
      throw new Error("API key not found");
    }
  
    const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
    const url = new URL(baseURL);
  
    const queryParams = {
      apiKey: apiKey,
      query: searchTerm,
      number: "10",
      offset: (page * 10).toString()
    };
  
    url.search = new URLSearchParams(queryParams).toString();
  
    try {
        const fetch = require('node-fetch');
      const searchResponse = await fetch(url.toString());
      const resultsJson = await searchResponse.json();
      return resultsJson;
    } catch (error) {
      console.error(error);
    }
  };

 export const getFavouriteRecipesByIDs = async (ids: string[])=>{
    const apiKey = process.env.API_KEY
    if (!apiKey) {
      throw new Error("API key not found");
    }
    const url = new URL("https://api.spoonacular.com/recipes/informationBulk")
    const params ={
      apiKey: apiKey,
      ids: ids.join(","),

    }
    url.search= new URLSearchParams(params).toString();
    const fetch = require('node-fetch');
    const searchResponse = await fetch(url);
    const json = await searchResponse.json();

    return {results: json}
  }