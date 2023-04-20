import { Row, Col, Container, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../componenets/CartItemComponent";

const CartPageComponent = ({
  addToCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
  removeFromCart
}) => {
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Are you sure")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Alert variant="info">Your cart is empty</Alert>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item, idx) => (
                  <CartItemComponent
                    item={item}
                    key={idx}
                    changeCount={changeCount}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>
                  Sub-total ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "Product" : "Products"})
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: <span className="fw-bold">${cartSubtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <LinkContainer to="/user/cart-details">
                  <Button
                    disabled={cartSubtotal === 0}
                    variant="success"
                    type="button"
                  >
                    Proceed to checkout
                  </Button>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPageComponent;