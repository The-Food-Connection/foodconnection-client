import React, { useState, useEffect } from 'react'
import { Snackbar } from 'material-ui';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router';
import RecipeForm from '../utils/RecipeForm';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RecipeNew({ history }) {
  const [message, setMessage] = useState({
    type: '',
    message: '',
    open: false
  })


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

  const [dietaries, setDietaries] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedDietaries, setSelectedDietaries] = useState([]);

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
    setMessage({ text: '', type: '', open: false })
  }

  useEffect(() => {
    fetchDietaries();
    fetchIngredients();
  }, []);

  return (
    <>
      <RecipeForm createNewRecipe={createNewRecipe}
        ingredients={ingredients}
        setSelectedIngredients={setSelectedIngredients}
        dietaries={dietaries}
        selectedDietaries={selectedDietaries}
        setSelectedDietaries={setSelectedDietaries}>
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

export default withRouter(RecipeNew);
