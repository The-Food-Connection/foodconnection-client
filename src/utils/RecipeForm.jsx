
import React, { useState, useEffect } from 'react'

export default function RecipeForm(props) {
  const {
    createNewRecipe,
    ingredients,
    setSelectedIngredients,
    dietaries,
    selectedDietaries,
    setSelectedDietaries,
    recipe,
    register,
    handleSubmit,
    reset
  } = props

  const [recipeForm, setRecipeForm] = useState(recipe)

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
    let newDietariesOptions = [...selectedDietaries]
    // add or remove to state array if checkbox is checked
    if (event.target.checked) {
      newDietariesOptions.push({ dietary_category_id: event.target.value })
    } else {
      newDietariesOptions = newDietariesOptions.filter(x => x.dietary_category_id !== event.target.value)
    }
    // once have the new array, update back to state
    setSelectedDietaries(newDietariesOptions)
  }

  const updateForm = () => {
  }

  return (
    
  )
}
