import React, { useState, setErrorMessage } from 'react'
import { Button, Form } from 'react-bootstrap'
import SelectFC from '../utils/SelectFC'

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
      image: ''
    }
  }

  const [errorMessage, setErrorMessage] = useState('')

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

  const recipePost = async (event) => {
    console.log(event.target)
    const formData = new FormData(event.target);
    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept": "application/json",
      },
      body: formData
    })

    const data = await response.json();

    if (response.status === 200) {
      history.push("/recipes");
    } else {
      setErrorMessage(data.error);
    }
  }

  const createNewRecipe = (event) => {
    event.preventDefault();
    // postData(process.env.REACT_APP_API_URL + '/recipes', recipeForm)
    recipePost(event)
    // props.updxate.setUpdate(!props.update.update)
  }

  return (
    <Form onSubmit={createNewRecipe}>
      <Form.Group className="mb-3" controlId="recipe_name">
        <Form.Label>Recipe Title: </Form.Label>
        <Form.Control type="text" placeholder="Recipe Title" onChange={changeInput} name="recipe_name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="recipe_instructions">
        <Form.Label>How to prepare: </Form.Label>
        <Form.Control as="textarea" rows={10} placeholder="Recipe Instructions" onChange={changeInput} name="recipe_instructions" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="cooking_time">
        <Form.Label>Cooking time: </Form.Label>
        <Form.Control type="number" placeholder="minutes" onChange={changeInput} name="cooking_time" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="serves">
        <Form.Label>Serves: </Form.Label>
        <Form.Control type="number" placeholder="serves" onChange={changeInput} name="serves" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image: </Form.Label>
        <Form.Control type="file" placeholder="image" onChange={changeInput} name="image" />
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

    </Form>
  )
}
