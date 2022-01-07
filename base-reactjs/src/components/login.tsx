import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IndexedObject } from '../utils/type';
import './login.css';

const LoginPage: React.FC<IndexedObject> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  return (
    <div className="Article">
      <h1 className="text-center pt-5">Login</h1>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                setEmail(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
