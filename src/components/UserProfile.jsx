import React from 'react';
import { useAuth } from "../contexts/AuthProvider";
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './styling/UserProfile.css';

export default function UserProfile() {

    const titleStyle = {
        textAlign: "center",
        textTransform: "uppercase"
    };   

    const { auth, authDispatch } = useAuth();    

    console.log(auth);
    
    return (
        <div className="userprofiles">
            <h1 style={titleStyle}>USER PROFILE</h1>

            {auth.loggedIn ?
            <div>

            <p style={titleStyle}>Welcome back {auth.username}!</p>

            <Container>
                <Row>

                    <Col>
                        <img className="userprofilepic" alt="userprofile" src="placeholder.jpg" />

                    </Col>
                    <Col>
                    <h2 style={titleStyle}>Your Account Details</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>DATE JOINED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>😀</td>
                            <td>{auth.username}</td>
                            <td>{auth.email}</td>
                            <td>{auth.created_at}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br></br>
                    If you're sadly wanting to leave our site, this cannot be undone.
                    
                    <br>
                    </br>
                    <br></br>
                    <button type="button" class="btn btn-danger btn-lg">DELETE ACCOUNT</button>

                    </Col>

                </Row>
            </Container>
            </div>
            : 
            <p>PLEASE LOG IN</p>}

            {/* <Container>
                <Row>

                    <Col>
                        <img src="placeholder.jpg" />

                    </Col>
                    <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>DATE JOINED</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{auth.id}</td>
                            <td>{auth.username}</td>
                            <td>{auth.email}</td>
                            <td>{auth.created_at}</td>
                            </tr>
                            {/* <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr> */}
                        {/* </tbody> */}
                    {/* </Table> */}

                    {/* </Col> */}

                {/* // </Row> */}
            {/* // </Container> */} 
 
        </div>
    )


};