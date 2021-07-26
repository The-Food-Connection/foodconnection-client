import React from 'react'
// import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider";
import RecipeList from './RecipeList';
import Login from './Login';
import '../App.css';

export default function Home() {
  const { auth, authDispatch } = useAuth();

  return (
    <div>
      {auth.loggedIn ?
        // <p>Welcome {auth.username}!</p>
        <RecipeList /> :
        // <Link to="Login">Please login</Link>
        <Login />
      }
      
    </div>
  )
}

