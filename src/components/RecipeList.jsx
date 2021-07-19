import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink } from "mdbreact"
import { bottom } from '@popperjs/core';

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);

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
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
    <h1>RECIPES</h1>
      {recipes.map((recipe) => (
        <MDBCard style={{ width: '18rem', marginBottom: '10px' }} color="mdb-color darken-1" expand="md" key={recipe.id}>
          <MDBCardImage variant="top" src={recipe.image} />
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
      ))}
    </div>
  )
}

