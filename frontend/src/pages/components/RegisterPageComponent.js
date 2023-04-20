import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const RegisterPageComponent = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState
}) => {
  const [validated, setValidated] = useState(false);

  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false
  });

  const [passwordMatchState, setPasswordMatchState] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordMatchState(true);
    } else {
      setPasswordMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    if (
      event.currentTarget.checkValidity() === true &&
      name &&
      lastName &&
      email &&
      password &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterUserResponseState({
            success: data.success,
            loading: false
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        .catch((err) =>
          setRegisterUserResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data
          })
        );
    }
    setValidated(true);
  };

  return (
    <>
      <Container>
        <Row className="mt-5  justify-content-md-center">
          <Col md={6}>
            <h1>Register</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter e-mail"
                  name="email"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  minLength={6}
                  onChange={onChange}
                  isInvalid={!passwordMatchState}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Password should have atleast 6 characters
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  minLength={6}
                  onChange={onChange}
                  isInvalid={!passwordMatchState}
                />
                <Form.Control.Feedback type="invalid">
                  Both password should match
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="pb-2">
                <Col>
                  Do you have an account already?{" "}
                  <Link to={"/login"}> Login </Link>
                </Col>
              </Row>

              <Button type="submit" variant="success">
                {registerUserResponseState &&
                registerUserResponseState.loading === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                Submit
              </Button>
              <Alert
                className="mt-2"
                show={
                  registerUserResponseState &&
                  registerUserResponseState.error === "User exists"
                }
                variant="danger"
              >
                User with that e-mail already exists.
              </Alert>
              <Alert
                show={
                  registerUserResponseState &&
                  registerUserResponseState.success === "User created"
                }
                variant="info"
              >
                User created.
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPageComponent;
