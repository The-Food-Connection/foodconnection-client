import React, { useState } from 'react';
import { Alert, Button, Form, Row, Col } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import '../App.css';

function Login({ history }) {
  const { authDispatch } = useAuth();

  const changeInput = event => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value
    })
  };

  const sendLoginRequest = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginForm)
    })

    const data = await response.json();
    console.log(data)
    if (data.token) {
      authDispatch({
        type: "login",
        username: data.username,
        email: data.email,
        token: data.token,
        admin: data.admin,
        id: data.id,
        created_at: data.created_at
      });
      history.push("/");
    } else {
      setErrorMessage(data.error);
    }
  }

  const submitInput = event => {
    event.preventDefault();
    console.log(loginForm)
    sendLoginRequest()
  }

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
      <Row>
        <Col>
          <img className="loginpic" alt="loginpic" src="loginpage.jpg" />
        </Col>
        
        <Col>
          <h2>Please Enter Login Details Below</h2>
          {errorMessage ?
            <Alert variant="danger">{errorMessage}</Alert> : null}

          <Form onSubmit={submitInput}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={loginForm.username} onChange={changeInput} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" placeholder="Password" value={loginForm.password} onChange={changeInput} name="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              LOGIN
            </Button>

            <Link to="/sign-up" className="btn btn-success">SignUp</Link>
          </Form>
        </Col>
      </Row>
    </>

  )
}

export default withRouter(Login);
