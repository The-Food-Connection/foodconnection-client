import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import RecipeList from "./components/RecipeList";
import NotFound from "./components/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from "./contexts/AuthProvider";
// import AuthProvider from "../contexts/AuthProvider";

function App() {
  return (
    <div className="App">
      THE FOOD CONNECTION
      <AuthProvider>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route render={() => <h1>404 Page not found</h1>} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;