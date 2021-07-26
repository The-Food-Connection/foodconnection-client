import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { deleteRequest } from '../utils/apiRequest';
import '../App.css';

export default function AdminDashboard({ history }) {

    const titleStyle = {
        textAlign: "center",
    };

    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [update, setUpdate] = useState(false);

    const fetchRecipes = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/recipes", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = await response.json();
        console.log(data)
        setRecipes(data);
    };

    const fetchUsers = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = await response.json();
        console.log(data)
        setUsers(data);
    };

    const fetchRatings = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/ratings", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = await response.json();
        console.log(data)
        setRatings(data);
    };

    const handleDelete = async (model, id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${model}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const data = await response.json();
        console.log(data.status)
        if (data.status === 200 || data.status === 201 || data.status === 204) {
            console.log('hey')
            window.location.reload();
            setUpdate(!update);
        }
    }

    const enableUser = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/enable`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        const data = await response.json();
        console.log(data)
        if (data.status === 200 || data.status === 201 || data.status === 204) {
            console.log('hey')
            window.location.reload();
            setUpdate(!update);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [])

    useEffect(() => {
        fetchRatings();
    }, [update])

    return (
        <div>
            <h1 style={titleStyle}>ADMIN DASHBOARD</h1>
            <h3>All User Information</h3>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID #</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>DATE JOINED</th>
                        {/* <th>ACTIONS</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                {!user.disabled ?
                                    <td><Button variant="danger" onClick={() => handleDelete("users", user.id)}>DISABLE</Button> </td>
                                    : <td><Button variant="success" onClick={() => enableUser(user.id)}>ENABLE</Button> </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <h3>All Recipes On Site</h3>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID #</th>
                        <th>RECIPE NAME</th>
                        <th>RECIPE AUTHOR</th>
                        <th>DATE CREATED</th>
                        {/* <th>ACTIONS</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        recipes && recipes.map((recipe) => (
                            <tr key={recipe.id}>
                                <td>{recipe.id}</td>
                                <td>{recipe.recipe_name}</td>
                                <td>{recipe.user_id}</td>
                                <td>{recipe.created_at}</td>
                                {/* <td><Button variant="danger" onClick={() => deleteRecipe(recipe.id)}>DELETE</Button> </td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <h3>All Ratings On Site</h3>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID #</th>
                        <th>RECIPE NAME</th>
                        <th>RECIPE AUTHOR</th>
                        <th>DATE CREATED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ratings && ratings.map((rating) => (
                            <tr key={rating.id}>
                                <td>{rating.id}</td>
                                <td>{rating.rating}</td>
                                <td>{rating.review}</td>
                                <td>{rating.created_at}</td>
                                <td><Button variant="danger" onClick={() => handleDelete("ratings", rating.id)}>DELETE</Button> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
};
