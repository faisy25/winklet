import { Button } from "react-bootstrap";

const RemoveFromCartComponent = ({
  removeFromCartHandler = false,
  productID,
  orderCreated,
  quantity,
  price
}) => {
  return (
    <Button
      disabled={orderCreated}
      type="button"
      variant="danger"
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    >
      <i className="bi bi-trash"></i>
    </Button>
  );
};
export default RemoveFromCartComponent;
