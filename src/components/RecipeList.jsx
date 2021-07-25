import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink, MDBInput } from "mdbreact"
import { Row, Col } from 'react-bootstrap';
import RecipeRandom from './RecipeRandom';
import RecipeCategories from './RecipeCategories';

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [recipesCopy, setRecipesCopy] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);
  // const [update, setUpdate] = useState(false);

  const fetchRecipes = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    console.log(data)
    setRecipes(data);
    setRecipesCopy(data);
    setRandomRecipe(data[Math.floor(Math.random() * data.length)])
  };

  const handleSearch = (e) => {
    if(!e.target.value) {
      setRecipes(recipesCopy)
    } 
    else {
      const filteredRecipes = recipes.filter(recipe => recipe.recipe_name.toLowerCase().includes(e.target.value.toLowerCase()))
      setRecipes(filteredRecipes)
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>

      <RecipeCategories />

      <RecipeRandom recipe={randomRecipe} />

      <h1>RECIPES</h1>

      <div className="form-group">
        <MDBInput hint="Search.." size="lg" onChange={handleSearch}/>
      </div>

      <Row className="justify-content-sm-center">
        {recipes.map((recipe) => (
          <Col lg={true} key={recipe.id}>
            <MDBCard style={{ width: '18rem', marginBottom: '10px' }} color="mdb-color darken-1" expand="md">
              <MDBCardImage className="card-img-top" variant="top" src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"} />
              <MDBCardBody>
                <MDBCardTitle>{recipe.recipe_name}</MDBCardTitle>
                <MDBCardText>
                  {recipe.cuisine}
                </MDBCardText>
                <MDBCardText>
                  {recipe.meal_type}
                </MDBCardText>
                <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-primary">Learn more</MDBLink>
              </MDBCardBody>
            </MDBCard>
          </Col>
        ))}
      </Row>

    </div>
  )
}

