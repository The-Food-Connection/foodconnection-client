import React, { useState, useEffect } from 'react';
import { postData } from '../utils/apiRequest';
import { MDBJumbotron, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBContainer } from "mdbreact";
import { Button, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import "./styling/NewRating.css";
import { matchPath } from 'react-router';


export default function NewRating({ match, update, history }) {

  //setting initial state for recipe, then fetching recipe data from api and then setRecipe to assign data to recipe state
  const [recipe, setRecipe] = useState({});

  const fetchRecipe = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    console.log(data)
    setRecipe(data.recipe);
  };

  // using useEffect to run fetchRecipe function to get data
  useEffect(() => {
    fetchRecipe();
  }, [])

  // setting style for header
  const titleStyle = {
    textAlign: "center",
  };

  // setting rating initial state as empty string for both rating and review
  const ratingInitialState = {
    rating: {
      rating: '',
      review: '',
      date: '',
      recipe_id: ''
    }
  }

  // setting initial state for ratingForm, and setRatingForm
  const [ratingForm, setRatingForm] = useState(ratingInitialState)

  // using changeInput action to update rating values to what is typed in the input boxes
  const changeInput = (event) => {
    setRatingForm({
      rating: {
        ...ratingForm.rating,
        [event.target.name]: event.target.value
      }
    })
  }

  const ratingPost = async (event) => {
    const formData = new FormData(event.target);

    const response = await fetch(process.env.REACT_APP_API_URL + "/ratings", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept": "application/json"
      },
      body: formData
    })
    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      history.push(`/recipes/${recipe.id}`);
    } else {
      // setErrorMessage(data.error)
      console.log(`this is data error ${data.error}`);
    }
  }

  // creatNewRating prevents the default refresh when submit pressed, uses postData method from utils to postData to /ratings
  const createNewRating = (event) => {
    event.preventDefault();
    ratingPost(event);
  }

  const { rating, review, date } = ratingForm.rating

  return (
    <>
      <br></br>
      <h2 style={titleStyle}>ADD A NEW RATING FOR THE DISH BELOW</h2>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className="p-0">
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
              </MDBCardBody>
            </MDBJumbotron>
          </MDBCol>
          <MDBCol>

            <Form onSubmit={createNewRating}>
              <Form.Group controlId="rating">
                <StarRating />
              </Form.Group>
              <Form.Group className="mb-3" controlId="review">
                <Form.Label>Review: </Form.Label>
                <Form.Control type="text" placeholder="Write Your Review Here" value={review} onChange={changeInput} name="review" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Date: </Form.Label>
                <Form.Control type="date" placeholder="Select Today's Date" value={date} onChange={changeInput} name="date" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="recipe_id">
                <Form.Label>Prefilled Recipe ID: </Form.Label>
                <input type="number" value={match.params.id} name="recipe_id" />
              </Form.Group>

              <Button variant="primary" type="submit">
                SUBMIT RATING
              </Button>
            </Form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
};
