import React from 'react'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownItem, MDBDropdownToggle, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import fclogoshort from "../images/FClogoshort.JPG";
import { MDBBtn } from 'mdb-react-ui-kit'
import { useAuth } from "../contexts/AuthProvider"; import { useState } from 'react';

export default function NavigationBar(state) {

  const [isOpen, setIsOpen] = useState(false)
  const { auth, authDispatch } = useAuth();

  function toggleCollapse() {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <MDBNavbar color="mdb-color darken-1" dark expand="md">
        <MDBNavbarBrand>
          <img src={fclogoshort} alt="fclogoshort" width="110px" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          {auth.loggedIn ?
            <>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <a class="text-success" href="/" style={{ marginRight: 20 }}>HOME  </a>
                </MDBNavItem>
                <MDBNavItem active>
                  <a class="text-warning" href="/recipes" style={{ marginRight: 20 }}>All Recipes  </a>
                </MDBNavItem>
                <MDBNavItem>
                  <a class="text-warning" href="/user-profile" style={{ marginRight: 20 }}>  User Profile  </a>
                </MDBNavItem>
                <MDBNavItem>
                  <a class="text-warning" href="/my-recipes" style={{ marginRight: 20 }}>  My Recipes  </a>
                </MDBNavItem>
                <MDBNavItem>
                  <a class="text-warning" href="/recipe-new" style={{ marginRight: 20 }}>  Add New Recipe</a>
                </MDBNavItem>
                {auth.admin ?
                  <MDBNavItem>
                    <a class="text-danger" href="/admin-dashboard" style={{ marginRight: 20 }}>  Admin Page  </a>
                  </MDBNavItem>
                  : null}
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">Meal Types</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem href="/categories/breakfast">Breakfast</MDBDropdownItem>
                      <MDBDropdownItem href="/categories/lunch">Lunch</MDBDropdownItem>
                      <MDBDropdownItem href="/categories/dinner">Dinner</MDBDropdownItem>
                      <MDBDropdownItem href="/categories/dessert">Dessert</MDBDropdownItem>
                      <MDBDropdownItem href="/categories/snacks">Snacks</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBBtn className='mx-2' color='primary' onClick={() => authDispatch({ type: 'sign-out' })} >Logout</MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>
            </>
            : null}
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );
}
<MDBNavItem>
  <MDBDropdown>
    <MDBDropdownToggle nav caret>
      <span className="mr-2">Meal Types</span>
    </MDBDropdownToggle>
    <MDBDropdownMenu>
      <MDBDropdownItem href="/categories/breakfast">Breakfast</MDBDropdownItem>
      <MDBDropdownItem href="/categories/lunch">Lunch</MDBDropdownItem>
      <MDBDropdownItem href="/categories/dinner">Dinner</MDBDropdownItem>
      <MDBDropdownItem href="/categories/dessert">Dessert</MDBDropdownItem>
      <MDBDropdownItem href="/categories/snacks">Snacks</MDBDropdownItem>
    </MDBDropdownMenu>
  </MDBDropdown>
</MDBNavItem>
