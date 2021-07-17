import React from 'react'
import { useAuth } from "../contexts/AuthProvider";

export default function Home() {
  const { auth, authDispatch } = useAuth();

  return (
    <div>
      Welcome {auth.username}!
    </div>
  )
}

