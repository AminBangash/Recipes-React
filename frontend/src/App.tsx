import "./App.css";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, FormEvent,useRef, useEffect } from "react";
import * as api from "./api";
import { Recipe } from './types';
import RecipeModal from "./components/RecipeModal";


type Tabs = "search" | "favourites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe| undefined>(undefined);
  const [selectedTab,setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes,setFavouriteRecipes] = useState<Recipe[]>([]);
  const PageNumber = useRef(1);


  useEffect(()=>{
    const fetchFavouriteRecipes = async() =>{
      try{
         const favouriteRecipes = await api.getFavouriteRecipes();
         setFavouriteRecipes(favouriteRecipes.results)
         
      }
      catch(err){
        console.log(err)
      }
    }
    fetchFavouriteRecipes();
  },[])
  


  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results)
      PageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMoreClick = async() =>{
    const nextPage = PageNumber.current + 1;
    try{
         const nextRecipes = await api.searchRecipes(searchTerm, nextPage)
         setRecipes([...recipes,...nextRecipes.results])
         PageNumber.current = nextPage;
    }
    catch (error) {
      console.log(error)
  }
}

 const addFavouriteRecipe = async (recipe:Recipe) => {
  try{
       await addFavouriteRecipe(recipe);
       setFavouriteRecipes([...favouriteRecipes,recipe]);
  }
  catch(err){
    console.log(err)
  }
 }

 const removeFavouriteRecipe = async (recipe:Recipe) => {
  try{
       await api.removeFavouriteRecipe(recipe);
       const updatedRecipes = favouriteRecipes.filter((favRecipe)=>{
        recipe.id !== favRecipe.id
       })
       setFavouriteRecipes(updatedRecipes);
  }
  catch(err){
    console.log(err)
  }
 }


  return (
    <div className="app-container">
      <div className="header">
        <img src="/hero-image.jpg"></img>
        <div className="title">My Recipe App</div>
      </div>
      <div className="tabs">
        <h1 
        className= {selectedTab === "search" ? "tab-active" : ""}
        onClick ={()=>setSelectedTab('search')}>Recipe Search</h1>
        <h1
         className= {selectedTab === "favourites" ? "tab-active" : ""}
        onClick={()=>setSelectedTab('favourites')}>Favourites</h1>
      </div>
      {selectedTab === 'search' && (<>
        <form onSubmit={(event) => handleSearchSubmit(event)}>
          <input
            type="text"
            required
            placeholder="Enter a search term"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch size={40} />
          </button>
        </form>
        <div className="recipe-grid">
        {recipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some(
            (favRecipe)=>favRecipe.id === recipe.id
          );
          return(
          <RecipeCard 
          key={recipe.id}
          recipe={recipe} 
          onClick={()=>setSelectedRecipe(recipe)}
          onFavouriteButtonClick ={isFavourite ? removeFavouriteRecipe : addFavouriteRecipe}
          isFavourite ={isFavourite}
          />
          )
        })}

        </div>
       
        <button className="view-more-button"
        onClick= {handleViewMoreClick}
        >View More</button>
      </>)}
     

      {selectedTab ==='favourites' && (
      <div className="recipe-grid">
        { favouriteRecipes.map((recipe) =>(
        <RecipeCard 
        recipe={recipe} 
        onClick ={()=>setSelectedRecipe(recipe)}
        onFavouriteButtonClick={removeFavouriteRecipe}
        isFavourite = {true}
        />
        ))}
        </div>
        )}
       
        {selectedRecipe?(
        <RecipeModal
         recipeId={selectedRecipe.id.toString()} 
         onClose={()=>setSelectedRecipe(undefined)}/>): null}
    
    </div>
  );
};

export default App;