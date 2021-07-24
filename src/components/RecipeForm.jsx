import React, { useState, setErrorMessage, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import SelectFC from '../utils/SelectFC'
import { MDBCheckbox } from 'mdb-react-ui-kit';
import Ingredients from '../utils/Ingredients'
import { Snackbar } from 'material-ui';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function RecipeForm(history) {

  const formInitialState = {
    recipe: {
      recipe_name: '',
      recipe_instructions: '',
      cooking_time: '',
      serves: '',
      skill_level: '',
      cuisine: '',
      meal_type: '',
      image: '',
      recipe_dietaries_attributes: [],
      ingredients: []
      // recipe_ingredients_attributes: []
    }
  }

  const [message, setMessage] = useState({
    type: '',
    message: '',
    open: false
  })

  const [recipeForm, setRecipeForm] = useState(formInitialState)

  const defaultOptions = {
    cuisine: ["Australian", "Brazilian", "Italian", "Indian", "Asian", "Japanese", "American", "Mexican"],
    mealType: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
    skillLevel: ["Beginner", "Intermediate", "Medium", "Advanced"]
  }

  const changeInput = (event) => {
    setRecipeForm({
      recipe: {
        ...recipeForm.recipe,
        [event.target.name]: event.target.value
      }
    })
  }

  const changeCheckbox = (event) => {
    // console.log(event)
    // clone array from state to be able to modify
    let newDietariesOptions = [...recipeForm.recipe.recipe_dietaries_attributes]
    // add or remove to state array if checkbox is checked
    if (event.target.checked) {
      newDietariesOptions.push({ dietary_category_id: event.target.value })
    } else {
      newDietariesOptions = newDietariesOptions.filter(x => x.dietary_category_id !== event.target.value)
    }
    // console.log(newDietariesOptions)
    // once have the new array, update back to state
    setRecipeForm({
      recipe: {
        ...recipeForm.recipe,
        "recipe_dietaries_attributes": newDietariesOptions
      }
    })
  }

  const recipePost = async (event) => {
    console.log(event.target)
    const formData = new FormData(event.target);
    // append recipe dietaries as JSON.stringify to work with formData
    // rails will need to JSON.parse before use 
    formData.append('recipe_dietaries_attributes', JSON.stringify(recipeForm.recipe.recipe_dietaries_attributes))
    formData.append('recipe_ingredients_attributes', JSON.stringify(selectedIngredients))

    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept": "application/json"
      },
      body: formData
    })

    const data = await response.json();
    console.log(data)
    if (response.status === 200) {
      setMessage({
        text: "Recipe successfully added.",
        type: "success",
        open: true
      });
      history.push("/recipes");
    } else {
      setMessage({
        text: "Mandatory fields missing.",
        type: "error",
        open: true
      });
    }
  }

  const createNewRecipe = (event) => {
    event.preventDefault();
    // postData(process.env.REACT_APP_API_URL + '/recipes', recipeForm)
    recipePost(event)
    // props.update.setUpdate(!props.update.update)
  }

  const [dietaries, setDietaries] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const fetchDietaries = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/dietaries", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    console.log(data)
    setDietaries(data);
  };

  const fetchIngredients = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/ingredients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    console.log(data)
    setIngredients(data);
  };

  function closeSnackBar() {
    console.log('aaaa')
    setMessage({text: '', type: '', open: false})
  }
  
  useEffect(() => {
    fetchDietaries();
    fetchIngredients();
  }, []);

  return (
    <>
      <Form onSubmit={createNewRecipe}>
        <Form.Group className="mb-3" controlId="recipe_name">
          <Form.Label>Recipe Title: </Form.Label>
          <Form.Control required type="text" placeholder="Recipe Title" onChange={changeInput} name="recipe_name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ingredients">
          <Form.Label>Ingredients: </Form.Label>
          <Ingredients ingredients={ingredients} setIngredients={setSelectedIngredients}></Ingredients>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipe_instructions">
          <Form.Label>How to prepare: </Form.Label>
          <Form.Control required as="textarea" rows={10} placeholder="Recipe Instructions" onChange={changeInput} name="recipe_instructions" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cooking_time">
          <Form.Label>Cooking time: </Form.Label>
          <Form.Control required type="number" placeholder="minutes" onChange={changeInput} name="cooking_time" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="serves">
          <Form.Label>Serves: </Form.Label>
          <Form.Control required type="number" placeholder="serves" onChange={changeInput} name="serves" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image: </Form.Label>
          <Form.Control type="file" placeholder="image" onChange={changeInput} name="image" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dietaries">
          <Form.Label>Dietaries: </Form.Label>
          {dietaries.map((dietary) => (
            <MDBCheckbox name={dietary.name} id={dietary.name} value={dietary.id} label={dietary.name} onChange={changeCheckbox} key={dietary.name} inline />
          ))}
        </Form.Group>
        <Form.Group className="mb-3" controlId="skill_level">
          <Form.Label>Skill Level: </Form.Label>
          <SelectFC name="skill_level" text="Skill Level" options={defaultOptions.skillLevel} changeSelect={changeInput}></SelectFC>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cuisine">
          <Form.Label>Cuisine: </Form.Label>
          <SelectFC name="cuisine" text="Cuisine" options={defaultOptions.cuisine} changeSelect={changeInput}></SelectFC>
        </Form.Group>
        <Form.Group className="mb-3" controlId="meal_type">
          <Form.Label>Meal Type: </Form.Label>
          <SelectFC name="meal_type" text="Meal Type" options={defaultOptions.mealType} changeSelect={changeInput}></SelectFC>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Recipe
        </Button>

      </Form >
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={closeSnackBar}
        open={message.open}
        autoHideDuration={2000}
        message={message.text}
      />
    </>
  )
}
