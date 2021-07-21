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
                <MDBRow class="d-flex justify-content-center">
                
                <MDBCol size="2">
                    <div className="category">
                    <Image src="breakfast.jpg" roundedCircle />
                    <h4>BREAKFAST</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <Image src="lunch.jpg" roundedCircle />
                    <h4>LUNCH</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <Image src="dinner.jpg" roundedCircle />
                    <h4>DINNER</h4>
                    </div>
                </MDBCol>

                <MDBCol size="2">
                    <div className="category">
                    <Image src="dessert.jpg" roundedCircle />
                    <h4>DESSERT</h4>
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