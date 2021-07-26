import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink } from "mdbreact"
import { Row, Col } from 'react-bootstrap';
import { AuthContext, useAuth } from "../contexts/AuthProvider";
import { deleteRequest } from '../utils/apiRequest';

export default function MyRecipes() {

  const [recipes, setRecipes] = useState([]);

  const { auth, authDispatch } = useAuth();

  const [update, setUpdate] = useState(false);

  const titleStyle = {
    textAlign: "center",
    textTransform: "uppercase"
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

  // const deleteRecipe = (recipeId) => {
  //     deleteRequest(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
  //     setUpdate(!update);
  // }


  return (
    <div>
      <h1 style={titleStyle}>MY PERSONAL RECIPES</h1>
      <h3 style={titleStyle}>Have a Wonderful Day</h3>
      <Row className="justify-content-sm-center">
        {recipes.map((recipe) => (
          recipe.user_id === auth.id ?
            <Col lg={true} key={recipe.id}>
              <MDBCard style={{ width: '18rem', marginBottom: '10px' }} color="mdb-color purple-gradient" expand="md">
                <MDBCardImage className="card-img-top" variant="top" src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"} />
                <MDBCardBody>
                  <MDBCardTitle>Recipe Name - {recipe.recipe_name}</MDBCardTitle>
                  <MDBCardText>
                    Cuisine:
                    {recipe.cuisine}
                  </MDBCardText>
                  <MDBCardText>
                    Meal Type:
                    {recipe.meal_type}
                  </MDBCardText>
                  <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-indigo">VIEW RECIPE</MDBLink>
                  <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-warning">EDIT RECIPE</MDBLink>
                  {/* <MDBLink onClick={() => deleteRecipe(recipe.id)} className="btn btn-danger">DELETE RECIPE</MDBLink> */}
                </MDBCardBody>
              </MDBCard>
              {console.log(recipe)}
              {console.log(recipe.user_id)}
            </Col>
            : null
        ))}
      </Row>
    </div>
  )
}

