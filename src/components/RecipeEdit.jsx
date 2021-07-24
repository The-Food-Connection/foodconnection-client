import React, { useState, useEffect } from 'react'
import { Snackbar } from 'material-ui';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router';
import RecipeForm from '../utils/RecipeForm';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RecipeEdit({ history, match }) {
  const [dietaries, setDietaries] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedDietaries, setSelectedDietaries] = useState([]);
  const [message, setMessage] = useState({
    type: '',
    message: '',
    open: false
  })

  const validationSchema = Yup.object().shape({
    recipe_name: Yup.string().required(),
    recipe_instructions: Yup.string().required(),
    cooking_time: Yup.number().required(),
    serves: Yup.number().required(),
    skill_level: Yup.string().required(),
    meal_type: Yup.string().required(),
    cuisine: Yup.string().required()
  })

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const recipePost = async (formData) => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept": "application/json"
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

  const createNewRecipe = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    // append recipe dietaries as JSON.stringify to work with formData
    // rails will need to JSON.parse before use 
    formData.append('recipe_dietaries_attributes', JSON.stringify(selectedDietaries))
    formData.append('recipe_ingredients_attributes', JSON.stringify(selectedIngredients))

    recipePost(formData)
  }

  const fetchRecipe = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${match.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    // console.log(data)
    // to keep just one state, I am adding the image url to the recipe object
    data.recipe.imageUrl = data.image
    const fields = ["recipe_name", "recipe_instructions", "cooking_time", "serves", "skill_level", "meal_type", "cuisine"]
    fields.forEach(field => {
      setValue(field, data.recipe[field])
    })
    setRecipe(data.recipe);
  };

  const fetchDietaries = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/dietaries", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    // console.log(data)
    setDietaries(data);
  };

  const fetchIngredients = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/ingredients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await response.json();
    // console.log(data)
    setIngredients(data);
  };

  function closeSnackBar() {
    setMessage({ text: '', type: '', open: false })
  }

  useEffect(() => {
    fetchDietaries();
    fetchIngredients();
    fetchRecipe();
  }, []);

  return (
    <>
      <RecipeForm createNewRecipe={createNewRecipe}
        ingredients={ingredients}
        setSelectedIngredients={setSelectedIngredients}
        dietaries={dietaries}
        selectedDietaries={selectedDietaries}
        setSelectedDietaries={setSelectedDietaries}
        recipe={recipe}
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}>
      </RecipeForm>
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

export default withRouter(RecipeEdit);
