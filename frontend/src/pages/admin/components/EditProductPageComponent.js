// For cloudinary change !== to === for production.  line 398

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Fragment, useRef } from "react";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "./utils/utils";

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};

const EditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrVal = useRef(null);

  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });

  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select list
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((err) => console.log(err));
  }, [fetchProduct, id, imageRemoved, imageUploaded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };

    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "Product updated") navigate("/admin/products");
        })
        .catch((err) =>
          setUpdateProductResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data,
          })
        );
    }
    setValidated(true);
  };

  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      const mainCategoryOfEditedProductAllData = categories.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === mainCategoryOfEditedProduct
      );
      if (
        mainCategoryOfEditedProductAllData &&
        mainCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    setCategoryChoosen(product.category);
    setAttributesTable(product.attrs);
  }, [product, categories]);

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrVal.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={1}>
            <Link to="/admin/products">
              <Button variant="info" className="rounded-circle my-1">
                <i className="bi bi-arrow-bar-left"></i>
              </Button>
            </Link>
          </Col>
          <Col md={6}>
            <h1>Edit Product</h1>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  required
                  type="text"
                  defaultValue={product.name}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.formBasicDescription"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  required
                  as="textarea"
                  rows={3}
                  defaultValue={product.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCount">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  name="count"
                  required
                  type="number"
                  defaultValue={product.count}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  required
                  type="text"
                  defaultValue={product.price}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  required
                  aria-label="Default select example"
                  name="category"
                  onChange={(e) =>
                    changeCategory(
                      e,
                      categories,
                      setAttributesFromDb,
                      setCategoryChoosen
                    )
                  }
                >
                  <option value="Choose category">Choose category</option>
                  {categories.map((category, idx) => {
                    return product.category === category.name ? (
                      <option selected key={idx} value={category.name}>
                        {category.name}
                      </option>
                    ) : (
                      <option key={idx} value={category.name}>
                        {category.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              {attributesFromDb.length > 0 && (
                <Row className="mt-4">
                  <Col lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAttributes"
                    >
                      <Form.Label>Choose attribute and set value</Form.Label>
                      <Form.Select
                        name="atrrKey"
                        aria-label="Default select example"
                        ref={attrKey}
                        onChange={(e) =>
                          setValuesForAttrFromDbSelectForm(
                            e,
                            attrVal,
                            attributesFromDb
                          )
                        }
                      >
                        <option>Choose attribute</option>
                        {attributesFromDb.map((item, idx) => (
                          <Fragment key={idx}>
                            <option value={item.key}>{item.key}</option>
                          </Fragment>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAttributeValue"
                    >
                      <Form.Label>Attribute Value</Form.Label>
                      <Form.Select
                        name="atrrVal"
                        aria-label="Default select example"
                        ref={attrVal}
                        onChange={attributeValueSelected}
                      >
                        <option>Choose attribute value</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              )}
              <Row>
                {attributesTable && attributesTable.length > 0 && (
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attributesTable.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.key}</td>
                          <td>{item.value}</td>
                          <td>
                            <CloseButton
                              onClick={() => deleteAttribute(item.key)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNewAttribute"
                  >
                    <Form.Label>Create new attribute</Form.Label>
                    <Form.Control
                      disabled={categoryChoosen === "Choose category"}
                      placeholder="first choose or create category"
                      name="newAttrKey"
                      type="text"
                      onKeyUp={newAttrKeyHandler}
                      required={newAttrValue}
                      ref={createNewAttrKey}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNewAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Control
                      disabled={categoryChoosen === "Choose category"}
                      placeholder="first choose or create category"
                      name="newAttrValue"
                      type="text"
                      onKeyUp={newAttrValueHandler}
                      required={newAttrKey}
                      ref={createNewAttrVal}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Alert show={newAttrKey && newAttrValue} variant="primary">
                After typing attribute key and value press enter on one of the
                field
              </Alert>
              <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                <Form.Label>Images</Form.Label>
                <Row className="mb-1">
                  {product.images &&
                    product.images.map((image, idx) => (
                      <Col key={idx} style={{ position: "relative" }} xs={3}>
                        <Image
                          crossOrigin="anonymous"
                          src={image.path ?? null}
                          fluid
                        />
                        <i
                          style={onHover}
                          onClick={() =>
                            imageDeleteHandler(image.path, id).then((data) =>
                              setImageRemoved(!imageRemoved)
                            )
                          }
                          className="bi bi-x text-danger"
                        ></i>
                      </Col>
                    ))}
                </Row>
                <Form.Control
                  // required
                  type="file"
                  multiple
                  onChange={(e) => {
                    setIsUploading("upload files in progress ...");
                    if (process.env.NODE_ENV === "production") {
                      // !== to === for production
                      uploadImagesApiRequest(e.target.files, id)
                        .then((data) => {
                          setIsUploading("Upload file completed");
                          setImageUploaded(!imageUploaded);
                        })
                        .catch((err) =>
                          setIsUploading(
                            err.response.data.message
                              ? err.response.data.message
                              : err.response.data
                          )
                        );
                    } else {
                      uploadImagesCloudinaryApiRequest(e.target.files, id);
                      setIsUploading(
                        "Upload file completed. Wait for the result take effect, refresh also if neccessry"
                      );
                      setTimeout(() => {
                        setImageUploaded(!imageUploaded);
                      }, 4000);
                    }
                  }}
                />
                {isUploading}
              </Form.Group>
              <Button variant="info" type="submit" size="md" className="mb-3">
                Update
              </Button>
              {updateProductResponseState.error ?? ""}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditProductPageComponent;
