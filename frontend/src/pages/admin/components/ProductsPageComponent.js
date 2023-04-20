import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import AdminLinksComponent from "../../../componenets/admin/AdminLinksComponent";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const ProductsPageComponent = ({ fetchProducts, deleteProduct }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure")) {
      const data = await deleteProduct(productId);
      if (data === "Product removed") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((err) =>
        // setProducts([
        //   {
        //     name: err.response.data.message
        //       ? err.response.data.message
        //       : err.response.data
        //   }
        // ])
        dispatch(logout())
      );
    return () => abctrl.abort();
  }, [fetchProducts, productDeleted, dispatch]);

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1 className="mb-3">
            Product Lists{" "}
            <LinkContainer to="/admin/create-new-product">
              <Button variant="info" size="md">
                Create new
              </Button>
            </LinkContainer>
          </h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/edit-product/${product._id}`}>
                      <Button className="btn-sm" variant="info">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default ProductsPageComponent;
