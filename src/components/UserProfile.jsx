import React from 'react';
import { useAuth } from "../contexts/AuthProvider";
import { Row, Col, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './styling/UserProfile.css';
import '../App.css';

export default function UserProfile() {

    const titleStyle = {
        textAlign: "center",
        textTransform: "uppercase"
    };

    const { auth, authDispatch } = useAuth();

    return (
        <div className="userprofiles">
            <br></br>
            <h1 style={titleStyle}>USER PROFILE</h1>
            {auth.loggedIn ?
            <div>

            <p style={titleStyle}>Welcome back {auth.username}!</p>
            <br>
            </br>
            <p style={titleStyle}>Thank you for being a valued member of our Food Connection Family</p>
            <br></br>

            <Container>
                <Row>

                    <Col>
                        <img className="userprofilepic" alt="user profile" src="profilepage.jpg" />

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
                    If you're sadly wanting to deactivate your account, this cannot be undone.
                    
                    <br>
                    </br>
                    <br></br>
                    <button type="button" className="btn btn-danger btn-lg" aria-label= "delete account">DELETE ACCOUNT</button>

                    </Col>

                </Row>
            </Container>
            </div>
            : 
            <p>PLEASE LOG IN</p>}

        </div>
    )
};
