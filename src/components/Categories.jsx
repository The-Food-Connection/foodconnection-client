import React, { useState, useEffect } from 'react';
import RecipesByCategory from '../utils/RecipesByCategory';

const CATEGORIES = ["breakfast", "dessert", "dinner", "lunch", "snacks"]

export default function Categories({ history, match }) {
    const category = match.params.category;
    if (!CATEGORIES.includes(category)) {
        history.push("/")
    }
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = await response.json();
        console.log(data)
        const filteredRecipes = data.filter(recipe => recipe.meal_type.toLowerCase() === category.toLowerCase())
        console.log(category)
        console.log(filteredRecipes)
        setRecipes(filteredRecipes);

    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <RecipesByCategory recipes={recipes} type={category}></RecipesByCategory>
    )
};
