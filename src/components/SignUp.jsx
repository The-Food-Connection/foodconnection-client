import React, { useState } from 'react'
import { Alert, Button, Form, Row, Col } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthProvider";
import './styling/SignUp.css';

export default function SignUp({ history }) {
  const { authDispatch } = useAuth();

  const changeInput = event => {
    setSignUpForm({
      user: {
        ...signUpForm.user,
        [event.target.name]: event.target.value,
      }
    })
  }

  const submitInput = event => {
    event.preventDefault()
    console.log(signUpForm)
    signUpPost(event)
  }

  const signUpPost = async (event) => {
    const formData = new FormData(event.target);
    const response = await fetch(process.env.REACT_APP_API_URL + "/sign-up", {
      method: 'POST',
      headers: {
        "Accept": "application/json"
      },
      body: formData
    })

    const data = await response.json();
    console.log(data)
    if (data.token) {
      authDispatch({ type: 'login', token: data.token, username: signUpForm.user.username })
      history.push("/");
    } else {
      setErrorMessage(data.error);
    }
  }

  const [errorMessage, setErrorMessage] = useState('')

  const [signUpForm, setSignUpForm] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  })

  const { username, email, password, password_confirmation } = signUpForm.user;

  return (
    <>
      <Row>
      <Col>
      <img className="signuppic" src="signuppage.jpg" />
      </Col>
      <Col>
      <h2>Please Enter Your Details Below to Sign Up</h2>
      {errorMessage ?
        <Alert variant="danger">{errorMessage}</Alert> : null}

      <Form onSubmit={submitInput}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={changeInput} value={username} name="username"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={changeInput} value={email} name="email"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={changeInput} value={password} name="password"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password_confirmation">
          <Form.Label>Password confirmation: </Form.Label>
          <Form.Control type="password" placeholder="Password Confirmation" onChange={changeInput} value={password_confirmation} name="password_confirmation"/>
        </Form.Group>

        <Button variant="primary" type="submit">
          SIGN UP NOW
        </Button>
      </Form>
      </Col>
      </Row>
    </>
  )
}