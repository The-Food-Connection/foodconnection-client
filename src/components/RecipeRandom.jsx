import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import RecipeList from './RecipeList';
import './styling/RecipeRandom.css';

export default function RecipeRandom() {

    // // const [randomRecipe, setRandomRecipe] = useState({});

    // // const getRandomRecipe = async (randomRecipe) => {
    // //     return randomRecipe[Math.floor(Math.random() * recipes.length)]
    // //     // data.recipe.randomRecipe = data.randomRecipe
    // // }

    // // useEffect(() => {
    // //     randomRecipe(getRandomRecipe);
    // // }, []);

    // const [getRandomRecipe, setRandomRecipe] = useState({});

    // const fetchRandomRecipe = async () => {
    //     const randomRecipe = Math.floor(Math.random() * recipes.length)
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${randomRecipe}`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         }
    //     });

    //     const data = await response.json();
    //     console.log(data)
    //     // to keep just one state, I am adding the image url to the recipe object
    //     data.randomRecipe.recipe = data.randomRecipe
    //     setRandomRecipe(data.randomRecipe.recipe);
    // };

    // useEffect(() => {
    //     fetchRandomRecipe();
    // }, [randomRecipe])
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
