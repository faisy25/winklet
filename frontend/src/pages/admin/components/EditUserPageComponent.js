import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const navigate = useNavigate();

  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const isAdmin = form.isAdmin.checked;

    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(id, name, lastName, email, isAdmin)
        .then((data) => {
          if (data === "User updated") {
            navigate("/admin/users");
          }
        })
        .catch((err) => {
          setUpdateUserResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data
          });
        });
    }
    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdminState(data.isAdmin);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, [id, fetchUser]);

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={1}>
            <Link to="/admin/users">
              <Button variant="info" className="rounded-circle my-1">
                <i className="bi bi-arrow-bar-left"></i>
              </Button>
            </Link>
          </Col>
          <Col md={6}>
            <h1>Edit User</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  defaultValue={user.name}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a last name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  defaultValue={user.email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAdminCheck">
                <Form.Check
                  type="checkbox"
                  name="isAdmin"
                  label="Is Admin"
                  checked={isAdminState}
                  onChange={(e) => setIsAdminState(e.target.checked)}
                />
              </Form.Group>

              <Button variant="info" size="md" className="mb-3" type="submit">
                Update
              </Button>
              {updateUserResponseState.error}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditUserPageComponent;
