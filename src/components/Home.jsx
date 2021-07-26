import React from 'react'
import { useAuth } from "../contexts/AuthProvider";
import RecipeList from './RecipeList';
import Login from './Login';
import '../App.css';

export default function Home() {
  const { auth, authDispatch } = useAuth();
  return (
    <div>
      {auth.loggedIn ?
        <RecipeList /> :
        <Login />
      } 
    </div>
  )
}

