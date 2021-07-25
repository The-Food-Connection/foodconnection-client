import React, { useContext, useReducer } from "react";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const reducer = (state, action) => {
  switch (action.type) {
      
		case "login":
			localStorage.setItem('token', action.token)
      localStorage.setItem('id', action.id)
			localStorage.setItem('username', action.username)
      localStorage.setItem('email', action.email)
      localStorage.setItem('created_at', action.created_at)
      localStorage.setItem('admin', action.admin)

			return {
				...state,
				loggedIn: true,
        id: action.id,
				username: action.username,
        email: action.email
			};

    case "sign-out":
			localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('admin')
      // localStorage.removeItem('email');
      // localStorage.removeItem('created_at');
      return {
				loggedIn: false
			};

    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [auth, authDispatch] = useReducer(reducer, {
    loggedIn: !!localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    created_at: localStorage.getItem("created_at"),
    admin: localStorage.getItem("admin")
  });

  return (
    <AuthContext.Provider value={{ auth, authDispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
