import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider";

export default function Home() {
  const { auth, authDispatch } = useAuth();

  return (
    <div>
      {auth.loggedIn ?
        <p>Welcome {auth.username}!</p> :
        <Link to="Login">Please login</Link>
      }
    </div>
  )
}

