import { Recipe } from "./types";

// src/API.ts
const searchRecipes = async (searchTerm: string, page: number) => {
    const baseURL = new URL("http://localhost:5000/api/recipes/search");
    baseURL.searchParams.append("searchTerm", searchTerm);
    baseURL.searchParams.append("page", page.toString());
  
    const response = await fetch(baseURL.toString());
  
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  
    return response.json();
  };
  
  export { searchRecipes };

  export const getRecipeSummary = async (recipeId : string) =>
  {
    const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  }

  export const getFavouriteRecipes = async () =>{
    const url = new URL(`http://localhost:5000/api/recipes/favourite`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();

  }

  export const addFavouriteRecipe = async (recipe : Recipe) =>{
    const url = new URL(`http://localhost:5000/api/recipes/favourite`);
    const body = {
      recipeId: recipe.id
    }
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
    },
       body: JSON.stringify(body)
  })
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  }

  export const removeFavouriteRecipe = async (recipe : Recipe) =>{
    const url = new URL(`http://localhost:5000/api/recipes/favourite`);
    const body = {
      recipeId: recipe.id
    }
    const response = await fetch(url,{
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json'
    },
       body: JSON.stringify(body)
  })
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    // return response.json();
  }