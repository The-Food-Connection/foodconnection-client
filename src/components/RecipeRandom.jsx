import React from 'react';
import { Card } from 'react-bootstrap';
import './styling/RecipeRandom.css';
import { MDBLink } from "mdbreact"
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import '../App.css';


export default function RecipeRandom(props) {

    return (
        <div className="recipeoftheday">

            <MDBContainer class="row d-flex justify-content-center">
                <MDBCard style={{ width: "45rem", marginTop: "1rem" }} className="text-center">
                    <MDBCardHeader color="peach-gradient">FOR YOU!</MDBCardHeader>
                    <MDBCardBody class="text-center-2">
                    <MDBCardTitle>STAFF PICKED RECIPE OF THE DAY</MDBCardTitle>
                    <MDBCardText>
                    Click through to discover something new and exciting!
                    </MDBCardText>
                    <MDBLink to={`/recipes/${props.recipe.id}`} className="btn btn-warning">VIEW RECIPE</MDBLink>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>

        </div>
    )


};
