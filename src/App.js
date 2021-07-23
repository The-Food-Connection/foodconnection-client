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
import BreakfastPage from './components/BreakfastPage';
import LunchPage from './components/LunchPage';
import DinnerPage from './components/DinnerPage';
import DessertPage from './components/DessertPage';
import SnacksPage from './components/SnacksPage';

import NewRating from "./components/NewRating";
import RecipeForm from "./components/RecipeForm";
import NotFound from "./components/NotFound";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/sign-up" exact component={SignUp} />
            <ProtectedRoute path="/recipes" exact component={RecipeList} />
            <ProtectedRoute path="/recipes/:id" exact component={Recipe} />
            {/* <ProtectedRoute path="/ratings" exact component={NewRating} /> */}
            <ProtectedRoute path="/breakfast" exact component={BreakfastPage} />
            <ProtectedRoute path="/lunch" exact component={LunchPage} />
            <ProtectedRoute path="/dinner" exact component={DinnerPage} />
            <ProtectedRoute path="/dessert" exact component={DessertPage} />
            <ProtectedRoute path="/snacks" exact component={SnacksPage} />

            <ProtectedRoute path="/recipes/:id/rating" exact component={NewRating} />

            <ProtectedRoute path="/user-profile" exact component={UserProfile} />

            <ProtectedRoute path="/admin-dashboard" exact component={AdminDashboard} />


            <ProtectedRoute path="/recipe-new" exact component={RecipeForm} />
            <Route render={() => <h1>404 Page not found</h1>} />
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
