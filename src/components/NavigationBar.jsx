import React, { Component } from 'react'
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
  } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import fclogoshort from "../images/FClogoshort.JPG";

export class NavigationBar extends Component {
  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  render() {
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
                <MDBNavLink to="/recipes">ALL RECIPES</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">My Profile</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">My Recipes</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/recipe-new">Add Recipe</MDBNavLink>
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
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
      );
    }
  }

export default NavigationBar;
