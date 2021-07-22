import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { postData } from '../utils/apiRequest';
import { MDBJumbotron, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBContainer } from "mdbreact";
import { Button, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import "./styling/NewRating.css";


export default function NewRating(props, {match}) {

    const [ratingForm, setRatingForm] = useState(ratingInitialState)
    const [recipe, setRecipe] = useState({});

    // const [ratingForm, setRatingForm] = useState(ratingInitialState)

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

    useEffect(() => {
      fetchRecipe();
    }, [match.params.id])

    const titleStyle = {
      textAlign: "center",
    }; 

    const ratingInitialState = {
        rating: {
            rating: '',
            review: '',
        }
    }

    const changeInput = (event) => {
        setRatingForm({
            rating: {
                ...ratingForm.rating,
                [event.target.name]: event.target.value
            }
        })
    }

    const createNewRating = (event) => {
        event.preventDefault();
        postData(process.env.REACT_APP_API_URL + '/ratings', ratingForm)
        setRatingForm(ratingInitialState)
        props.update.setUpdate(!props.update.update)
    }

    const {rating, review} = ratingForm.rating

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

              {/* <MDBCardText>
                Dietaries:
                <ul>
                {recipe.dietary_categories && recipe.dietary_categories.map((dietary) => {
                  return (
                  <li key={dietary.id}>{dietary.name}</li>
                  )
                  })}
                </ul>
              </MDBCardText> */}

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
                    <Form.Group>
                        <StarRating />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating: </Form.Label>
                    <Form.Control type="number" placeholder="Select Your Rating from 1 to 5" value={rating} onChange={changeInput} name="rating" />
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="review">
                    <Form.Label>Review: </Form.Label>
                    <Form.Control type="text" placeholder="Review" value={review} onChange={changeInput} name="review" />
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
