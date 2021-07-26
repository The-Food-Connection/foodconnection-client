import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Snackbar } from 'material-ui';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router';
import Ingredients from '../utils/Ingredients';
import SelectFC from '../utils/SelectFC';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../App.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RecipeForm({ history, match }) {
  const { id } = match.params;
  // if id is present on url means that is edit
  const isAddMode = !id;

  const [dietaries, setDietaries] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [message, setMessage] = useState({
    type: '',
    message: '',
    open: false
  })
  const htmlForm = React.createRef()

  const defaultOptions = {
    cuisine: ["Australian", "Brazilian", "Italian", "Indian", "Asian", "Japanese", "American", "Mexican"],
    mealType: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"],
    skillLevel: ["Beginner", "Intermediate", "Medium", "Advanced"]
  }

  const validateForm = ["recipe_name", "recipe_instructions", "image", "cooking_time", "serves", "skill_level", "meal_type", "cuisine"]

  const [recipeForm, setRecipeForm] = useState({
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
      recipe_ingredients_attributes: []
    }
  })

  const validationSchema = Yup.object().shape({
    recipe_name: Yup.string().required(),
    recipe_instructions: Yup.string().required(),
    cooking_time: Yup.number().min(1).required(),
    image: Yup.mixed(),
    serves: Yup.number().min(1).required(),
    skill_level: Yup.string().required(),
    meal_type: Yup.string().required(),
    cuisine: Yup.string().required()
  })

  // functions to build form returned by useForm() hook
  const { control, register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const recipePost = async (formData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes${!isAddMode ? `/${id}` : ""}`, {
      method: isAddMode ? 'POST' : 'PUT',
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    })

    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
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

  const handleDietaries = (dietaries, data) => {
    dietaries.forEach(x => {
      // move the id (id from db table turns into dietary_category_id)
      x.dietary_category_id = x.id
      // if recipe have dietaries, that is an edit
      if (recipe.recipe_dietaries) {
        // check if dietary was already part of the recipe
        const exists = recipe.recipe_dietaries.find(r => r.dietary_category_id === x.dietary_category_id)

        // if exists false it means it's not part of the recipe already
        if (!exists) {
          // cleanup unnecessary fields to make rails happy
          delete x.id
          delete x.name
          // check checkbox status, if returns true it means it needs to be added
          if (isCheckboxChecked(data.dietaries, x)) {
            data.recipe_dietaries_attributes.push(x)
          }
        }
        // if exists true, just need to check if checkbox is false to add for deletion
        else {
          // if checkbox is false, mark x.delete true so rails can delete from db
          if (!isCheckboxChecked(data.dietaries, x)) {
            x.delete = true
            x.id = exists.id
            data.recipe_dietaries_attributes.push(x)
          }
        }
      }
      // new recipe, wont have any dietaries on recipe.dietaries
      else {
        if (isCheckboxChecked(data.dietaries, x)) {
          data.recipe_dietaries_attributes.push(x)
        }
      }
    })
    return data
  }

  const handleIngredients = (ingredientsList) => {
    // ingredientsList is the list to send to rails
    // need to identify new ones and ones to delete
    if (recipe.recipe_ingredients) {
      // check if any recipe ingredients were deleted to mark for deletion on rails
      recipe.recipe_ingredients.forEach(recipeIngredient => {
        const exists = ingredientsList.find(x => {
          return parseInt(x.ingredient_id) === parseInt(recipeIngredient.ingredient_id)
        })
        if (!exists) {
          recipeIngredient.delete = true
          ingredientsList.push(recipeIngredient)
        }
      })
    }

    return ingredientsList
  }

  const createNewRecipe = (data, e) => {
    const formData = new FormData(e.target);
    data.recipe_dietaries_attributes = []
    data.recipe_ingredients_attributes = []

    // go through the list of existing dieataries
    data = handleDietaries(dietaries, data)

    // go through the list of existing ingredients
    data.recipe_ingredients_attributes = handleIngredients(selectedIngredients)

    // append recipe dietaries as JSON.stringify to work with formData
    // rails will need to JSON.parse before use 
    formData.append('recipe_dietaries_attributes', JSON.stringify(data.recipe_dietaries_attributes))
    formData.append('recipe_ingredients_attributes', JSON.stringify(data.recipe_ingredients_attributes))

    recipePost(formData)
  }

  const isCheckboxChecked = (cbList, cb) => {
    return cbList[cb.dietary_category_id]
  }

  const fetchDietaries = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/dietaries", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    if (data) {
      setDietaries(data);
    }
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

  const fetchRecipe = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    return response
  };

  function closeSnackBar() {
    console.log('aaaa')
    setMessage({ text: '', type: '', open: false })
  }

  const changeInput = (event) => {
    setRecipeForm({
      recipe: {
        ...recipeForm.recipe,
        [event.target.name]: event.target.value
      }
    })
  }

  useEffect(() => {
    fetchDietaries();
    fetchIngredients();
    if (!isAddMode) {
      fetchRecipe().then(async response => {
        const recipeData = await response.json();
        console.log(recipeData)
        if (recipeData) {
          recipeData.recipe.imageUrl = recipeData.image
          validateForm.forEach(field => {
            setValue(field, recipeData.recipe[field])
          })
          recipeData.recipe.dietary_categories.forEach(d => {
            setValue(`dietaries.${d.id}`, true)
          })
          setRecipe(recipeData.recipe);
          setSelectedIngredients(recipeData.recipe.recipe_ingredients)
        }
      })
    }
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit(createNewRecipe)} onReset={reset} ref={htmlForm}>
        <Form.Group className="mb-3" controlId="recipe_name">
          <Form.Label>Recipe Title: </Form.Label>
          <Form.Control required type="text" placeholder="Recipe Title" onChange={changeInput} {...register('recipe_name')} name="recipe_name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ingredients">
          <Form.Label>Ingredients: </Form.Label>
          <Ingredients ingredients={ingredients} recipeIngredients={selectedIngredients} setIngredients={setSelectedIngredients}></Ingredients>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipe_instructions">
          <Form.Label>How to prepare: </Form.Label>
          <Form.Control required as="textarea" rows={10} placeholder="Recipe Instructions" onChange={changeInput} name="recipe_instructions" {...register('recipe_instructions')} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cooking_time">
          <Form.Label>Cooking time: </Form.Label>
          <Form.Control required type="number" placeholder="minutes" onChange={changeInput} name="cooking_time" {...register('cooking_time')} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="serves">
          <Form.Label>Serves: </Form.Label>
          <Form.Control required type="number" placeholder="serves" onChange={changeInput} name="serves" {...register('serves')} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image: </Form.Label>
          <Form.Control type="file" placeholder="image" onChange={changeInput} name="image" {...register('image')} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dietaries">
          <Form.Label>Dietaries: </Form.Label>
          {dietaries.map((dietary, index) => (
            <MDBCheckbox name={dietary.name} id={dietary.name} label={dietary.name} key={dietary.id} inline {...register(`dietaries.${dietary.id}`)} />
          ))}
        </Form.Group>
        <Form.Group className="mb-3" controlId="skill_level">
          <Form.Label>Skill Level: </Form.Label>
          <SelectFC name="skill_level" text="Skill Level" options={defaultOptions.skillLevel} changeSelect={changeInput} register={register}></SelectFC>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cuisine">
          <Form.Label>Cuisine: </Form.Label>
          <SelectFC name="cuisine" text="Cuisine" options={defaultOptions.cuisine} changeSelect={changeInput} register={register}></SelectFC>
        </Form.Group>
        <Form.Group className="mb-3" controlId="meal_type">
          <Form.Label>Meal Type: </Form.Label>
          <SelectFC name="meal_type" text="Meal Type" options={defaultOptions.mealType} changeSelect={changeInput} register={register}></SelectFC>
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

export default withRouter(RecipeForm);
