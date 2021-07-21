import React, { useState } from 'react'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBLink } from "mdbreact"
import { useEffect } from 'react';

export default function Recipe({ match }) {

  const [recipe, setRecipe] = useState({});

  const fetchRecipe = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    console.log(data)
    // to keep just one state, I am adding the image url to the recipe object
    data.recipe.imageUrl = data.image
    setRecipe(data.recipe);
  };

  useEffect(() => {
    fetchRecipe();
  }, [match.params.id])

  return (
    <MDBContainer className="mt-5 text-center">
      <h1>RECIPE</h1>
      <MDBRow>
        <MDBCol>
          <MDBJumbotron className="p-0">
            {/* <MDBCardImage
                // src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"}
                src="placeholder.jpg"
                className="img-fluid"
                alt="recipe image"
            /> */}
                <img
                  // src="placeholder.jpg"
                  src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"}
                  class="img-fluid"
                  alt=""
                />
              <MDBCardBody>
              <MDBCardTitle className="h3">{recipe.recipe_name}</MDBCardTitle>
              <MDBCardText>
                Posted by {recipe.user ? recipe.user.username : null}
              </MDBCardText>
              <MDBCardText>
                {recipe.cuisine} cuisine
              </MDBCardText>
              <MDBCardText>
                {recipe.meal_type}
              </MDBCardText>
              <MDBCardText>
                Skill level: {recipe.skill_level}
              </MDBCardText>
              <MDBCardText>
                How to prepare:
                <br></br>
                {recipe.recipe_instructions}
              </MDBCardText>
              <MDBCardText>
                Time: {recipe.cooking_time} minutes
              </MDBCardText>
              <MDBCardText>
                Serves: {recipe.serves}
              </MDBCardText>
              {recipe.ratings && recipe.ratings.length > 0 ?
                <>
                  <h3>Ratings:</h3>
                  <ul>
                    {recipe.ratings.map((rating) => {
                      return <li key={rating.id}>{rating.review}</li>
                    })}
                  </ul>
                </> : null}

            </MDBCardBody>
            {/* <button type="button" class="btn btn-secondary">RATE THIS DISH</button> */}
            c
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer >

  )
}
