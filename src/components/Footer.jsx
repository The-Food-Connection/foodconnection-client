import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import fclogo from "../images/FClogo.JPG";
import { useAuth } from "../contexts/AuthProvider";


const Footer = () => {
  const { auth, authDispatch } = useAuth();

  return (
    <div>
      {/* className="fixed-bottom" */}
      <MDBFooter color="mdb-color darken-1" className="font-small pt-4 mt-4">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              {/* <h5 className="title">Footer Content</h5> */}
              <img src={fclogo} width="300px" />
              {/* <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p> */}
            </MDBCol>
            <MDBCol md="6">
              {/* <h5 class="text-warning" className="title"><a href="/recipes">ALL RECIPES</a></h5> */}
              <ul>
                <li className="list-unstyled">
                  <a class="text-warning" href="/recipes">All Recipes</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/user-profile">User Profile</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/recipes">My Recipes</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/recipe-new">Add Recipe</a>
                </li>
                {auth.admin ?
                  <li className="list-unstyled">
                    <a class="text-warning" href="/admin-dashboard"  >ADMIN</a>
                  </li>
                  : null}
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
    </div>
  );
}

export default Footer;
