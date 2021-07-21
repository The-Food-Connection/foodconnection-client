import React, { Component } from 'react'
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import fclogoshort from "../images/FClogoshort.JPG";
import { MDBBtn } from 'mdb-react-ui-kit'
import { useAuth } from "../contexts/AuthProvider";
import { useState } from 'react';

export default function NavigationBar(state) {

  const [isOpen, setIsOpen] = useState(false)
  const { authDispatch } = useAuth();

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }
  
    return (
      <Router>
        <MDBNavbar color="mdb-color darken-1" dark expand="md">
          <MDBNavbarBrand>
            {/* <strong className="white-text">THE FOOD CONNECTION</strong> */}
            <img src={fclogoshort} width="110px"/>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <a class="text-warning" href="/recipes" style={{ marginRight: 20 }}>ALL RECIPES  </a>
                {/* <Link to="/recipes">ALL RECIPES</Link> */}
                {/* <MDBNavLink to="/recipes">ALL RECIPES</MDBNavLink> */}
              </MDBNavItem>
              <MDBNavItem>
                {/* <MDBNavLink to="/user">My Profile</MDBNavLink> */}
                <a class="text-warning" href="/user-profile" style={{ marginRight: 20 }}>  User Profile  </a>
              </MDBNavItem>
              <MDBNavItem>
                {/* <MDBNavLink to="/recipes">My Recipes</MDBNavLink> */}
                <a class="text-warning" href="/recipes" style={{ marginRight: 20 }}>  My Recipes  </a>
              </MDBNavItem>
              <MDBNavItem>

                {/* <MDBNavLink to="/recipe-new">Add Recipe</MDBNavLink> */}
                <a class="text-warning" href="/recipe-new" style={{ marginRight: 20 }}>  Add New Recipe</a>

                {/* <MDBNavLink to="/recipe-new">Add Recipe</MDBNavLink> */}

              </MDBNavItem>
              <MDBNavItem>
                {/* <MDBNavLink to="/recipes">My Recipes</MDBNavLink> */}
                <a class="text-warning" href="/admin-dashboard" style={{ marginRight: 20 }}>  ADMIN  </a>
              </MDBNavItem>
              {/* <MDBNavItem> */}
                {/* <MDBDropdown> */}
                  {/* <MDBDropdownToggle nav caret>
=======

  return (
    <Router>
      <MDBNavbar color="mdb-color darken-1" dark expand="md">
        <MDBNavbarBrand>
          {/* <strong className="white-text">THE FOOD CONNECTION</strong> */}
          <img src={fclogoshort} width="110px" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <a href="/recipes" style={{ marginRight: 20 }}>ALL RECIPES  </a>
              {/* <Link to="/recipes">ALL RECIPES</Link> */}
              {/* <MDBNavLink to="/recipes">ALL RECIPES</MDBNavLink> */}
            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBNavLink to="/user">My Profile</MDBNavLink> */}
              <a href="/user" style={{ marginRight: 20 }}>  My Profile  </a>
            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBNavLink to="/recipes">My Recipes</MDBNavLink> */}
              <a href="/recipes" style={{ marginRight: 20 }}>  My Recipes  </a>
            </MDBNavItem>
            <MDBNavItem>

              {/* <MDBNavLink to="/recipe-new">Add Recipe</MDBNavLink> */}
              <a href="/recipe-new" style={{ marginRight: 20 }}>  Add New Recipe</a>

                {/* <MDBNavLink to="/recipe-new">Add Recipe</MDBNavLink> */}

            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBDropdown> */}
              {/* <MDBDropdownToggle nav caret>
                    <span className="mr-2">Dropdown</span>
                  </MDBDropdownToggle> */}
              {/* <MDBDropdownMenu>
                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  </MDBDropdownMenu> */}
                {/* </MDBDropdown> */}
              {/* </MDBNavItem> */}
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            <MDBNavItem>
              <MDBBtn className='mx-2' color='primary' onClick={() => authDispatch({ type: 'sign-out' })} >Logout</MDBBtn>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );
}

