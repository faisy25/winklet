import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddedToCartMessageComponent = ({
  showCartMessage,
  setShowCartMessage
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Alert
      show={showCartMessage}
      variant="info"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>The product was added to cart</Alert.Heading>

      <Button variant="light" onClick={goBack}>
        Go back
      </Button>
      {"  "}
      <Link to="/cart">
        <Button variant="success">Go to cart</Button>
      </Link>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
