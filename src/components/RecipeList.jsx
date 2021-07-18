import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);

  // const [update, setUpdate] = useState(false);

  const fetchRecipes = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    console.log(data)
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);


  return (
    <div>
      {recipes.map((recipe) => (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={recipe.image} />
          <Card.Body>
            <Card.Title>{recipe.recipe_name}</Card.Title>
            <Card.Text>
              {recipe.cuisine}
            </Card.Text>
            <Card.Text>
              {recipe.meal_type}
            </Card.Text>
            <Button variant="primary">Learn more</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

