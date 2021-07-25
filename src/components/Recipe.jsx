import React, { useState } from 'react'
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBCardText, MDBLink } from "mdbreact"
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';

export default function Recipe({ match, history }) {

  const { auth, authDispatch } = useAuth();
  const [recipe, setRecipe] = useState({});

  const fetchRecipe = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    if (data.status === 404) {
      history.push("/")
    }
    // to keep just one state, I am adding the image url to the recipe object
    // data.recipe.imageUrl = data.image
    setRecipe(data.recipe);
  };

  const handleDelete = async () => {
    console.log(match.params.id)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${match.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    const data = await response.json();
    if (data.status === 200 || data.status === 201 || data.status === 204) {
      history.push('/')
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, [match.params.id])

  return (
    <>
      {recipe ?
        <MDBContainer className="mt-5 text-center">
          < h1 > RECIPE</h1 >
          <MDBRow>
            <MDBCol>
              <MDBJumbotron className="p-0">
                <img
                  src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"}
                  className="img-fluid"
                  alt={recipe.recipe_name}
                />
                <MDBCardBody>
                  <MDBCardTitle className="h3">{recipe.recipe_name}</MDBCardTitle>
                  <MDBCardText>
                    Posted by {recipe.username}
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
                    Dietaries:
                    <ul>
                      {recipe.dietary_categories && recipe.dietary_categories.map((dietary) => {
                        return (
                          <li key={dietary.id}>{dietary.name}</li>
                        )
                      })}
                    </ul>
                  </MDBCardText>
                  <MDBCardText>
                    Ingredients:
                    <ul>
                      {recipe.recipe_ingredients && recipe.recipe_ingredients.map((ingredient) => {
                        return (
                          <li key={recipe.recipe_ingredients.id}>{ingredient.quantity} {ingredient.measure_type} {ingredient.name}</li>
                        )
                      })}
                    </ul>
                  </MDBCardText>
                  <MDBCardText>
                    How to prepare:
                    {recipe.recipe_instructions}
                  </MDBCardText>
                  <MDBCardText>
                    Time: {recipe.cooking_time} minutes
                  </MDBCardText>
                  <MDBCardText>
                    Serves: {recipe.serves}
                  </MDBCardText>
                  {
                    recipe.ratings && recipe.ratings.length > 0 ?
                      <>
                        <h3>Ratings:</h3>
                        <ul>
                          {recipe.ratings.map((rating) => {
                            return <li key={rating.id}>{rating.review}</li>
                          })}
                        </ul>
                      </> : null
                  }

                </MDBCardBody>
                {/* <button type="button" class="btn btn-secondary">RATE THIS DISH</button> */}
                <MDBLink to={`/recipes/${recipe.id}/rating`} className="btn btn-secondary">RATE THIS DISH</MDBLink>
                {auth.user_id === recipe.user_id || auth.admin ?
                  <>
                    <MDBLink to={`/recipes/${recipe.id}/edit`} className="btn btn-primary">EDIT</MDBLink>
                    <MDBLink to="" onClick={handleDelete} className="btn btn-danger">DELETE</MDBLink>
                  </>
                  : null}

              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer >
        : null}
    </>

  )
}
