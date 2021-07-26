import React from 'react';
import { Card } from 'react-bootstrap';
import './styling/RecipeRandom.css';
import { MDBLink } from "mdbreact"

export default function RecipeRandom(props) {

    return (
        <div>
            <Card className="text-center">
                <Card.Header>FEATURED RECIPE OF THE DAY</Card.Header>
                <Card.Body>
                    <Card.Title>Feel Like Spicing Up Dinner?</Card.Title>
                    <Card.Text>
                        Our Creators have picked something amazing for you to cook today, check it out!
                    </Card.Text>
                    <Card.Text>
                    </Card.Text>
                    <MDBLink to={`/recipes/${props.recipe.id}`} className="btn btn-primary">VIEW RECIPE</MDBLink>
                </Card.Body>
                <Card.Footer className="text-muted">The Food Connection Staff</Card.Footer>
            </Card>
        </div>
    )
};
