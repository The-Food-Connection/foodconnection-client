import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink, MDBInput } from "mdbreact"
import { Row, Col } from 'react-bootstrap';
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

      <h1>ALL RECIPES</h1>

      <div className="form-group">
        <MDBInput hint="Search.." size="lg" onChange={handleSearch} />
      </div>
      <div className="cardrows">
      <Row class="d-flex align-content-start flex-wrap">
        {recipes && recipes.map((recipe) => (
          <Col lg={true} key={recipe.id}>
            <MDBCard style={{ width: '18rem', marginBottom: '10px' }} color="rgba-indigo-slight" expand="md" className="card">
              <MDBCardImage className="card-img-top" variant="top" src={(recipe.imageUrl) ? recipe.imageUrl : "placeholder.jpg"} />
              <MDBCardBody className="cardbody">
                <MDBCardTitle>Recipe Name:
                  {recipe.recipe_name}</MDBCardTitle>
                <MDBCardText>
                  Recipe Cuisine:
                  {recipe.cuisine}
                </MDBCardText>
                <MDBCardText>
                  Meal Type: 
                  {recipe.meal_type}
                </MDBCardText>
                <MDBLink to={`/recipes/${recipe.id}`} className="btn btn-primary">Learn more</MDBLink>
              </MDBCardBody>
            </MDBCard>
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

