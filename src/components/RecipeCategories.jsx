import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import "./styling/RecipeCategories.css";

export default function RecipeCategories () {



    return (
        <div>

            {/* <Container> */}
            {/* <MDBJumbotron fluid className="jumbo"> */}

            <MDBContainer fluid>
                <MDBRow class="d-flex justify-content-center align-items-center">
                
                <MDBCol size="2">
                    <div className="category">
                    <a href="http://localhost:8080/breakfast"><Image src="breakfast.jpg" roundedCircle /></a>
                    <h4>BREAKFAST</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <a href="http://localhost:8080/lunch"><Image src="lunch.jpg" roundedCircle /></a>
                    <h4>LUNCH</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <a href="http://localhost:8080/dinner"><Image src="dinner.jpg" roundedCircle /></a>
                    <h4>DINNER</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <a href="http://localhost:8080/dessert"><Image src="dessert.jpg" roundedCircle /></a>
                    <h4>DESSERT</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <a href="http://localhost:8080/snacks"><Image src="snacks.jpg" roundedCircle /></a>
                    <h4>SNACKS</h4>
                    </div>
                </MDBCol>

                </MDBRow>  
            </MDBContainer>
{/* 
            </MDBJumbotron> */}
            {/* </Container> */}

        </div>
    )
};