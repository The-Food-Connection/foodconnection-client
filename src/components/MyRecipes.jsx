import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink } from "mdbreact"
import { Row, Col } from 'react-bootstrap';
import { AuthContext, useAuth } from "../contexts/AuthProvider";
import { deleteRequest } from '../utils/apiRequest';
import '../App.css';
// import RecipeCategories from './RecipeCategories';

export default function MyRecipes() {

  const [recipes, setRecipes] = useState([]);

  const { auth, authDispatch } = useAuth();  
  // const [update, setUpdate] = useState(false);

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
    // data.recipes.imageUrl = data.image
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

//   componentDidMount(); {
//     const { array } = recipes.props;
//     const userDetails = (array.map(({userID}) => fetch(process.env.REACT_APP_API_URL + `users/${userID}`),
//     this.setState({ userDetails })
//     ))}; 

  // console.log(auth.id);
//   console.log(userDetails);

    const deleteRecipe = (recipeId) => {
        deleteRequest(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`)
        setUpdate(!update);
    }


  return (
    <div>

      {/* <RecipeCategories />   */}

      <h1 style={titleStyle}>MY PERSONAL RECIPES</h1>

      <h3 style={titleStyle}>Have a Wonderful Day</h3>

      <Row className="justify-content-sm-center">
        {recipes.map((recipe) => (
            recipe.user_id === auth.id ?
            
          <Col lg={true} key={recipe.id}>
            <MDBCard style={{ width: '18rem', marginBottom: '10px' }} color="rgba-green-strong" expand="md">
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
                  {/* {recipe.user.username} */}
                </MDBCardText>
                <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-indigo">VIEW RECIPE</MDBLink>
                <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-warning">EDIT RECIPE</MDBLink>
                <MDBLink onClick={() => deleteRecipe(recipe.id)} className="btn btn-danger">DELETE RECIPE</MDBLink>
              </MDBCardBody>
            </MDBCard>
            {console.log(recipe)}
            {console.log(recipe.user_id)}
          </Col>

            :
            null
        ))}
      </Row>

    </div>
  )
}

