import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink } from "mdbreact"

export default function DessertPage() {

    const titleStyle = {
        textAlign: "center",
    }; 

    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
    
        const data = await response.json();
        // data.recipes.imageUrl = data.image
        setRecipes(data);

    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div>
            
                <Card>
                    <Card.Img variant="top" src="dessert-header.jpg" />
                    <Card.Body>
                    <Card.Text>
                    <h1 style={titleStyle}>DESSERT PAGE</h1>
                    </Card.Text>
                    </Card.Body>
                </Card>

                <Row className="justify-content-sm-center">
                    {recipes.map((recipe) => (
                        recipe.meal_type === "Dessert" ? 
                    <Col lg={true} key={recipe.id}>
                        <MDBCard style={{ width: '18rem', marginBottom: '10px' }} color="mdb-color darken-1" expand="md">
                        <MDBCardImage className="card-img-top" variant="top" src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"} />
                        <MDBCardBody>
                            <MDBCardTitle>{recipe.recipe_name}</MDBCardTitle>
                            <MDBCardText>
                            {recipe.cuisine}
                            </MDBCardText>
                            <MDBCardText>
                            {recipe.meal_type}
                            </MDBCardText>
                            <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-primary">Learn more</MDBLink>
                        </MDBCardBody>
                        </MDBCard>
                    </Col>
                    : null
                    ))}
                </Row>

            {/* <h1 style={titleStyle}>BREAKFAST PAGE</h1> */}
        </div>
    )
};