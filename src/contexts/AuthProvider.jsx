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
      localStorage.setItem('user_id', action.user_id)

			return {
				...state,
				loggedIn: true,
        id: action.id,
				username: action.username,
        email: action.email
        admin: JSON.parse(action.admin)

			};

    case "sign-out":
			localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('admin');
      localStorage.removeItem('user_id');
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
    admin: JSON.parse(localStorage.getItem("admin")),
    user_id: parseInt(localStorage.getItem("user_id"))
  });

  return (
    <AuthContext.Provider value={{ auth, authDispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
