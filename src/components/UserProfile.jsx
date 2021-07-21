import React from 'react';
import { useAuth } from "../contexts/AuthProvider";
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default function UserProfile() {

    const titleStyle = {
        textAlign: "center",
    };   

    const { auth, authDispatch } = useAuth();    

    console.log(auth);
    
    return (
        <div>
            <h1 style={titleStyle}>USER PROFILE</h1>

            {auth.loggedIn ?
            <div>

            <p style={titleStyle}>Welcome {auth.username}!</p>

            <Container>
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
                            <td>Your Details</td>
                            <td>{auth.username}</td>
                            <td>{auth.email}</td>
                            <td>{auth.created_at}</td>
                            </tr>
                        </tbody>
                    </Table>

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