import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import fclogo from "../images/FClogo.JPG";

const Footer = () => {
  return (
    <MDBFooter color="mdb-color darken-1" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            {/* <h5 className="title">Footer Content</h5> */}
            <img src={fclogo} width="300px"/>
            {/* <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p> */}
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">ALL RECIPES</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">My Profile</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">My Recipes</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Add Recipe</a>
              </li>
              {/* <li className="list-unstyled">
                <a href="#!">ABOUT US</a>
              </li> */}
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          {/* &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a> */} 
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;