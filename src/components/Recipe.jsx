import React, { useState } from 'react'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact"
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
    setRecipe(data);
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
            <MDBCardImage
              className="img-fluid"
              src={recipe.image}
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
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer >

  )
}
