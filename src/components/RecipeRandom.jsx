import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './styling/RecipeRandom.css';

export default function RecipeRandom() {

    const [random, setRandom] = useState({});

    return (
        <div>
            <Card className="text-center">
                <Card.Header>FEATURED RECIPE OF THE DAY</Card.Header>
                {/* <Card.Img className="recipeoftheday"  src="placeholder.jpg" /> */}
                <Card.Body>
                    <Card.Title>Feel Like Spicing Up Dinner?</Card.Title>
                    <Card.Text>
                    Our Creators have picked something amazing for you to cook today, check it out!
                    </Card.Text>
                    <Button variant="primary">VIEW RECIPE</Button>
                </Card.Body>
                <Card.Footer className="text-muted">The Food Connection Staff</Card.Footer>
            </Card>
        </div>
    )


};
