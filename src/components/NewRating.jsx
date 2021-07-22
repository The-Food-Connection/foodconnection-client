import React, { useState, useEffect } from 'react';
import { postData } from '../utils/apiRequest';
import { MDBJumbotron, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBContainer } from "mdbreact";
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
      // to keep just one state, I am adding the image url to the recipe object
      // data.recipe.imageUrl = data.image
      setRecipe(data.recipe);
    };

    // using useEffect to run fetchRecipe function to get data
    useEffect(() => {
      console.log(match)
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


    const [errorMessage, setErrorMessage] = useState('')

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

    console.log(`this is update ${update}`);
    console.log(`this is match params id ${match.params.id}`);

    const ratingPost = async (event) => {
      console.log(`this is event.target ${event.target}`)
      const formData = new FormData(event.target);
      // formData.append(match.params.id);
      console.log(`this is form data appended ${formData}`)

      const response = await fetch(process.env.REACT_APP_API_URL + "/ratings", {
        method: 'POST', 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Accept": "application/json"
        },
        body: formData
      })
      const data = await response.json();

      if (response.status === 200) {
        history.push("/recipes");
      } else {
        
        // console.log(`this is data error ${data.error}`);
        // setErrorMessage(data.error);
      }
    }

    // creatNewRating prevents the default refresh when submit pressed, uses postData method from utils to postData to /ratings
    const createNewRating = (event) => {
        event.preventDefault();
        ratingPost(event);
        // postData(process.env.REACT_APP_API_URL + '/ratings', ratingForm)
        setRatingForm(ratingInitialState)
        // update.setUpdate(!update.update)
        // update.setUpdate(!update.update)
    }

    const {rating, review, date, recipe_id} = ratingForm.rating

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
                    {/* <Form.Group>
                        <StarRating />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating: </Form.Label>
                    <Form.Control type="number" placeholder="Select Your Rating from 1 to 5" value={rating} onChange={changeInput} name="rating" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="review">
                    <Form.Label>Review: </Form.Label>
                    <Form.Control type="text" placeholder="Review" value={review} onChange={changeInput} name="review" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date: </Form.Label>
                    <Form.Control type="date" placeholder="Enter Date" value={date} onChange={changeInput} name="date" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipe_id">
                    <Form.Label>Prefilled Recipe ID: </Form.Label>
                    <input type="number" value={match.params.id} name="recipe_id"/>
                    {/* <Form.Control type="number" placeholder={match.params.id} value={recipe_id} name="recipe_id" /> */}
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