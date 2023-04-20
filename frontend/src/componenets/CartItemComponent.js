import { ListGroup, Row, Col, Image, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({
  item,
  orderCreated = false,
  changeCount = false,
  removeFromCartHandler = false
}) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={item.image ? item.image.path ?? null : null}
              fluid
            />
          </Col>
          <Col md={4}>{item.name}</Col>
          <Col md={1}>
            <span className="fw-bold">${item.price}</span>
          </Col>
          <Col md={2}>
            <Form.Select
              onChange={
                changeCount
                  ? (e) => changeCount(item.productID, e.target.value)
                  : undefined
              }
              disabled={orderCreated}
              value={item.quantity}
            >
              {[...Array(12).keys(item.count)].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productID={item.productID}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};
export default CartItemComponent;
