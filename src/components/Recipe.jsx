import React, { useState } from 'react'
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBCardText, MDBLink } from "mdbreact";
import { Row, Col, Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { FaStar } from 'react-icons/fa';
import '../App.css';
import './styling/Recipe.css';
import PlaceHolder from '../images/placeholder.jpg';

export default function Recipe({ match, history }) {

  const { auth, authDispatch } = useAuth();
  const [recipe, setRecipe] = useState({});
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    setRecipe(data.recipe);
    console.log(data)
    let total = 0
    data.recipe.ratings.map(x => total += x.rating)
    setRating(Math.ceil(total/data.recipe.ratings.length))
    setIsLoading(false)
    
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

  console.log(recipe);

  return (
    <>
      {recipe ?
        // <MDBContainer className="mt-5 text-center">
          <Container fluid className="recipecontainer">
          < h1 > RECIPE</h1 >
          <Row className="justify-content-center">

              {/* <MDBJumbotron className="p-0"> */}

              <Col className="text-center">
                <img
                  src={(recipe.imageURL) ? recipe.imageURL : PlaceHolder}
                  // src={recipe.imageURL}
                  className="recipepic"
                  alt={recipe.recipe_name}
                />
                {/* <img className="recipepic" alt="recipepic" src={PlaceHolder} /> */}
                </Col>

                <Col >

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
                        {[...Array(rating)].map(() => (<FaStar
                          className="star"
                          color="#ff1493"
                          size={30}
                        />
                        ))}
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
                {!isLoading && auth.id === recipe.user_id || auth.admin ?
                  <>
                    <MDBLink to={`/recipes/${recipe.id}/edit`} className="btn btn-primary">EDIT</MDBLink>
                    <MDBLink to="" onClick={handleDelete} className="btn btn-danger">DELETE</MDBLink>
                  </>
                  : null}
                </Col>

              {/* </MDBJumbotron> */}

            
          </Row>

        {/* </MDBContainer > */}
        </Container>
        : null}
    </>
  )
}
