import React from 'react';
import { Image } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import "./styling/RecipeCategories.css";
import '../App.css';

export default function RecipeCategories() {

    return (
        <div>
            <MDBContainer fluid>
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol size="2">
                        <div className="category">
                            <a href="/categories/breakfast"><Image src="breakfast.jpg" roundedCircle /></a>
                            <h4>BREAKFAST</h4>
                        </div>
                    </MDBCol>

                    <MDBCol size="2">
                        <div className="category">
                            <a href="/categories/lunch"><Image src="lunch.jpg" roundedCircle /></a>
                            <h4>LUNCH</h4>
                        </div>
                    </MDBCol>

                    <MDBCol size="2">
                        <div className="category">
                            <a href="/categories/dinner"><Image src="dinner.jpg" roundedCircle /></a>
                            <h4>DINNER</h4>
                        </div>
                    </MDBCol>

                    <MDBCol size="2">
                        <div className="category">
                            <a href="/categories/dessert"><Image src="dessert.jpg" roundedCircle /></a>
                            <h4>DESSERT</h4>
                        </div>
                    </MDBCol>

                    <MDBCol size="2">
                        <div className="category">
                            <a href="/categories/snacks"><Image src="snacks.jpg" roundedCircle /></a>
                            <h4>SNACKS</h4>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
};
