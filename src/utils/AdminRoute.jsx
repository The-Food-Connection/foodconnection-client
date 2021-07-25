import React from 'react'
import { useAuth } from "../contexts/AuthProvider";
import {Redirect, Route} from 'react-router-dom';

export default function AdminRoute({ component: Comp, path, ...rest }) {
  const { auth } = useAuth()

	if(auth.admin){
		return(
			<Route path={path} {...rest} render={(props) => {
				return <Comp {...props} />
			}} />
		)
	}

	return (
		<Redirect to="/" />
	)
}
