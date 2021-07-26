import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import MyRecipes from './components/MyRecipes';
import NewRating from "./components/NewRating";
import RecipeForm from "./components/RecipeForm";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";
import { MuiThemeProvider } from "material-ui/styles";
import AdminRoute from "./utils/AdminRoute";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MuiThemeProvider>
          <Router>
            <NavigationBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/sign-up" exact component={SignUp} />
              <ProtectedRoute path="/recipes" exact component={RecipeList} />
              <ProtectedRoute path="/my-recipes" exact component={MyRecipes} />
              <ProtectedRoute path="/recipes/:id" exact component={Recipe} />
              <ProtectedRoute path="/categories/:category" exact component={Categories} />
              <ProtectedRoute path="/recipe-new" exact component={RecipeForm} />
              <ProtectedRoute path="/recipes/:id/rating" exact component={NewRating} />
              <ProtectedRoute path="/recipes/:id/edit" exact component={RecipeForm} />
              <ProtectedRoute path="/user-profile" exact component={UserProfile} />
              <AdminRoute path="/admin-dashboard" exact component={AdminDashboard} />
              <Route render={() => <h1>404 Page not found</h1>} />
            </Switch>
            <Footer />
          </Router>
        </MuiThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
