import React, { useState } from 'react';
import { Alert, Button, Form, Row, Col } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthProvider";
import { Link } from 'react-router-dom';

export default function Login({ history }) {
  const { authDispatch } = useAuth();

  const changeInput = event => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value
    })
  };

  const sendLoginRequest = async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginForm)
    })

    const data = await response.json();
    console.log(data)
    if (data.token) {
      authDispatch({ type: "login", token: data.token, username: loginForm.username, admin: data.admin });
      console.log('aaaa')
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
      <img className="loginpic" src="loginpage.jpg" />
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
