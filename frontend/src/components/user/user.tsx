import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

function User() {
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
                <h1>Welcome User</h1>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>User Name</Card.Title>
                    <Card.Text>You can edit your User data here.</Card.Text>
                    <Button variant="primary">Edit User Data</Button>
                  </Card.Body>
                </Card>
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
