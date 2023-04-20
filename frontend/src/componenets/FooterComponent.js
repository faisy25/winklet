import { Container, Row, Col } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <>
      <footer>
        <Container fluid>
          <Row>
            <Col className="bg-dark text-white text-center py-3 h-100 mt-auto">
              Copyright &copy; SHOP
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
export default FooterComponent;
