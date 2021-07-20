import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { postData } from '../utils/apiRequest';
import { MDBJumbotron, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBContainer } from "mdbreact";
import { Button, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import "./styling/NewRating.css";


export default function NewRating(props) {

    const ratingInitialState = {
        rating: {
            rating: '',
            review: '',
        }
    }

    const [ratingForm, setRatingForm] = useState(ratingInitialState)

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
        <h1>ADD A NEW RATING FOR THE DISH BELOW</h1>
        <MDBContainer>

        <MDBRow>
        <MDBCol>

            <MDBJumbotron className="p-0">
            <MDBCardImage
              className="img-fluid"
            //   src= {}
            />
            <MDBCardBody>
              <MDBCardTitle className="h3">{}</MDBCardTitle>
              <MDBCardText>
                Posted by {}
              </MDBCardText>
              <MDBCardText>
                {} cuisine
              </MDBCardText>
              <MDBCardText>
                {}
              </MDBCardText>
              <MDBCardText>
                Skill level: {}
              </MDBCardText>
              <MDBCardText>
                How to prepare:
                <br></br>
                {}
              </MDBCardText>
              <MDBCardText>
                Time: {} minutes
              </MDBCardText>
              <MDBCardText>
                Serves: {}
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
