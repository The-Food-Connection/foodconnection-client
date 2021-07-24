import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import fclogoshort from "../images/FClogoshort.JPG";
import { MDBBtn } from 'mdb-react-ui-kit'
import { useAuth } from "../contexts/AuthProvider";
import { useState } from 'react';

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
          <img src={fclogoshort} width="110px" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>

          <MDBNavbarNav left>
            <MDBNavItem active>
              <a class="text-warning" href="/recipes" style={{ marginRight: 20 }}>ALL RECIPES  </a>
            </MDBNavItem>
            <MDBNavItem>
              <a class="text-warning" href="/user-profile" style={{ marginRight: 20 }}>  User Profile  </a>
            </MDBNavItem>
            <MDBNavItem>
              <a class="text-warning" href="/recipes" style={{ marginRight: 20 }}>  My Recipes  </a>
            </MDBNavItem>
            <MDBNavItem>
              <a class="text-warning" href="/recipe-new" style={{ marginRight: 20 }}>  Add New Recipe</a>
            </MDBNavItem>
            {auth.admin ?
              <MDBNavItem>
                <a class="text-warning" href="/admin-dashboard" style={{ marginRight: 20 }}>  ADMIN  </a>
              </MDBNavItem>
              : null}
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

