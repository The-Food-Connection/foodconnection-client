import React, { useEffect, useState } from 'react'
import { Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthProvider";
import '../App.css';
import './styling/MyRecipes.css';

export default function MyRecipes({history}) {

  const [recipes, setRecipes] = useState([]);

  const { auth, authDispatch } = useAuth();

  const [update, setUpdate] = useState(false);

  const titleStyle = {
    textAlign: "center",
  }; 

  const fetchRecipes = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    const data = await response.json();
    if (data.status === 200 || data.status === 201 || data.status === 204) {
      history.push('/')
      setUpdate(!update);
    }
  }


  return (
    <div>

      <br></br>
      <h1 style={titleStyle}>YOUR PERSONAL RECIPES</h1>

      <h3 style={titleStyle}>A Collection Of Your Family Favourites and Special Meals</h3>
      <br></br>
      <br></br>

      <Row className="justify-content-sm-center">
        {recipes.map((recipe) => (
            recipe.user_id === auth.id ?
          <Col md={3} key={recipe.id}>
            <Card style={{ width: '18rem' }} className="card">
              <Card.Img className="card-img-top" variant="top" src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"} />
              <Card.Body className="myrecipescardbody">
                <Card.Title>{recipe.recipe_name}</Card.Title>
                <Card.Text>
                Recipe Cuisine: 
                  {recipe.cuisine}
                </Card.Text>
              </Card.Body >
              <ListGroup className="list-group-flush">
                <ListGroupItem className="listitem">Meal Type: {recipe.meal_type}</ListGroupItem>
              </ListGroup>
              <Card.Body className="secondcardbody">
                <Button href={`/recipes/${recipe.id}`} variant="warning">VIEW RECIPE</Button>
                <Button href={`/recipes/${recipe.id}/edit`} variant="success">EDIT RECIPE</Button>
                <Button onClick={() => deleteRecipe(recipe.id)} variant="danger">DELETE RECIPE</Button>
              </Card.Body>
            </Card>
          </Col>
            :
            null
        ))}
      </Row>
    </div>
  )
}

