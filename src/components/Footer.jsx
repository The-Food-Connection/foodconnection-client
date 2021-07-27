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
              <img src={fclogo} alt="logopic" width="300px" />
            </MDBCol>
            <MDBCol md="6">
              {/* <h5 class="text-warning" className="title"><a href="/recipes">ALL RECIPES</a></h5> */}
              <ul>
                <li className="list-unstyled">
                  <a class="text-success" href="/">HOME</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/recipes">All Recipes</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/user-profile">User Profile</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/my-recipes">My Recipes</a>
                </li>
                <li className="list-unstyled">
                  <a class="text-warning" href="/recipe-new">Add Recipe</a>
                </li>
                {auth.admin ?
                  <li className="list-unstyled">
                    <a class="text-warning" href="/admin-dashboard"  >ADMIN</a>
                  </li>
                  : null}
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
          </MDBContainer>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
