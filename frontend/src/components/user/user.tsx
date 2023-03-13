import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    id: "",
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/user/" + id);
      setUser(await response.json());
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [id]);

  function editUser() {
    console.log("editUser()", id);
    console.log(username);
    return axios
      .put("http://localhost:3001/user/" + id, user)
      .then((response: any) => {
        response.data.username = username;
        console.log(response);
        console.log(response.data.username);

        console.log(response.status);
      });
  }

  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/user">Edit User</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/login">Log Out</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container>
        <Form>
          <Container>
            <Row>
              <Col></Col>
              <Col>
                <h1>Welcome {user.username}</h1>
                <Button variant="primary" onClick={handleShow}>
                  Edit user
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Change Username</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Username:
                      </InputGroup.Text>
                      <Form.Control
                        placeholder={user.username}
                        aria-label="Username"
                        onChange={(e: any) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={editUser}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </>
  );
}

export default User;
