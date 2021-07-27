import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink, MDBInput } from "mdbreact"
import { Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import RecipeRandom from './RecipeRandom';
import RecipeCategories from './RecipeCategories';
import ReactPaginate from 'react-paginate';
import '../App.css';
import './styling/RecipeList.css';

const PER_PAGE = 10;

export default function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [recipesCopy, setRecipesCopy] = useState([]);
  const [recipesSearch, setRecipesSearch] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);

  // const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  // const [pageCount, setPageCount] = useState(0);
  // const [offset, setOffset] = useState(0);

  const titleStyle = {
    textAlign: "center",
    // textTransform: "uppercase"
  }; 

  const fetchRecipes = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    console.log(data)
    // setRecipes(data);
    // store an original copy so it doesnt need to go to rails again
    setRecipesCopy(data);
    // this one saves data for the search bar so it work across pages
    setRecipesSearch(data);

    setRandomRecipe(data[Math.floor(Math.random() * data.length)])
    // setPageCount(Math.ceil(data.length / perPage))
    // console.log(`pageCount: ${pageCount}`)
    // const slice = data.slice(offset, offset + perPage)
    setRecipes(data)
    // processPagination(data, offset)
  };

  // const processPagination = (data, offset) => {
  //   const slice = data.slice(offset, offset + perPage)
  //   // console.log(`slice ${offset}, offset ${offset} + perPage ${perPage} ${offset + perPage}`)
  //   setRecipes(slice)
  //   // console.log(slice)
  // }

  const handleSearch = (e) => {
    if (!e.target.value) {
      setRecipes(recipesCopy)
      // setCurrentPage(0)
    }
    else {
      const filteredRecipes = recipesCopy.filter(recipe => recipe.recipe_name.toLowerCase().includes(e.target.value.toLowerCase()))
      setRecipes(filteredRecipes)
    }
  }

  // const handlePagination = ({ selected: selectedPage }) => {
  //   setCurrentPage(selectedPage);
  //   // console.log(`currentPage: ${e.selected}`)
  //   // setOffset(e.selected * perPage);
  //   // console.log(`offset: e.selected ${e.selected} * perPage ${perPage} = ${e.selected * perPage}`)
  //   // processPagination(recipesCopy, offset)
  // }

  // const offset = currentPage * PER_PAGE;
  // const currentPageData = recipes
  //   .slice(offset, offset + PER_PAGE)
  // const pageCount = Math.ceil(recipes.length / PER_PAGE);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="justify-content-center">

      <RecipeCategories />

      <RecipeRandom recipe={randomRecipe} />

      <h1 style={titleStyle}>ALL RECIPES</h1>

      <div className="form-group">
        <MDBInput hint="Start Typing your Search Here...." size="lg" onChange={handleSearch} />
      </div>

      <div className="cardrows">
      <Row class="d-flex align-content-center flex-wrap">
        {recipes && recipes.map((recipe) => (
                    
            <Col md={3} key={recipe.id}>
            <Card style={{ width: 'auto' }} className="card">
              <Card.Img className="card-img-top" variant="top" alt="recipe image" src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"} />
              <Card.Body className="cardbody">
                <Card.Title>{recipe.recipe_name}</Card.Title>
                <Card.Text>
                Recipe Cuisine: 
                  {recipe.cuisine}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="listitem">Meal Type: {recipe.meal_type}</ListGroupItem>
              </ListGroup>
              <Card.Body className="secondcardbody">
                <Button href={`/recipes/${recipe.id}`} variant="warning" aria-label="view recipe">Click For Recipe</Button>
              </Card.Body>
            </Card>
          </Col>


        ))}
      </Row>


      </div>
      {/* <Row className="justify-content-sm-center">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePagination}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </Row> */}

    </div>
  )
}

