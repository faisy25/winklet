// For cloudinary change !== to === for production.  line 71

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import {
  changeCategory,
  setValuesForAttrFromDbSelectForm,
  setAttributesTableWrapper,
} from "./utils/utils";

const CreateProductPageComponent = ({
  uploadImagesApiRequest,
  createProductApiRequest,
  uploadImagesCloudinaryApiRequest,
  newCategory,
  categories,
  reduxDispatch,
  deleteCategory,
  saveAttributeToCatDoc,
}) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [images, setImages] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [categoryChoosen, setCategoryChoosen] = useState("Choose category");
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrVal = useRef(null);
  const createNewAttrKey = useRef(null);

  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });

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
      if (images.length > 3) {
        setIsCreating("Too many files");
        return;
      }
      createProductApiRequest(formInputs)
        .then((data) => {
          if (images) {
            if (process.env.NODE_ENV !== "production") {
              uploadImagesApiRequest(images, data.productId)
                .then((res) => {})
                .catch((err) =>
                  setIsCreating(
                    err.response.data.message
                      ? err.response.data.message
                      : err.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryApiRequest(images, data.productId);
            }
          }
          if (data.message === "Product created") navigate("/admin/products");
        })
        .catch((err) =>
          setCreateProductResponseState(
            err.response.data.message
              ? err.response.data.message
              : err.response.data
          )
        );
    }

    setValidated(true);
  };

  const uploadHandler = (images) => {
    setImages(images);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      reduxDispatch(newCategory(e.target.value));
      setTimeout(() => {
        let element = document.getElementById("cats");
        setCategoryChoosen(e.target.value);
        element.value = e.target.value;
        e.target.value = "";
      }, 2000);
    }
  };

  const deleteCategoryHanlder = () => {
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChoosen("Choose category");
  };

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribbute value") {
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

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
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
            <h1>Create Product</h1>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" name="name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  name="description"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCount">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control required type="number" name="count" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control required type="text" name="price" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>
                  Category
                  <CloseButton onClick={deleteCategoryHanlder} />(
                  <small>remove selected</small>)
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="category"
                  required
                  id="cats"
                  onChange={(e) =>
                    changeCategory(
                      e,
                      categories,
                      setAttributesFromDb,
                      setCategoryChoosen
                    )
                  }
                >
                  <option value="">Choose category</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNewCategory">
                <Form.Label>
                  Or create new category (eg-Shoes/Books )
                </Form.Label>
                <Form.Control
                  onKeyUp={newCategoryHandler}
                  type="text"
                  name="newCategory"
                />
              </Form.Group>

              {attributesFromDb.length > 0 && (
                <Row className="mt-4">
                  <Col lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAttributeKey"
                    >
                      <Form.Label>Choose attribute and set value</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="attributeKey"
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
                          <React.Fragment key={idx}>
                            <option value={item.key}>{item.key}</option>
                          </React.Fragment>
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
                        aria-label="Default select example"
                        name="attributeValue"
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
                {attributesTable.length > 0 && (
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
                      disabled={["", "Choose category"].includes(
                        categoryChoosen
                      )}
                      placeholder="first choose or create category"
                      required={newAttrValue}
                      name="newAttrKey"
                      type="text"
                      ref={createNewAttrKey}
                      onKeyUp={newAttrKeyHandler}
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
                      disabled={["", "Choose category"].includes(
                        categoryChoosen
                      )}
                      placeholder="first choose or create category"
                      required={newAttrKey}
                      name="newAttrValue"
                      type="text"
                      ref={createNewAttrVal}
                      onKeyUp={newAttrValueHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Alert show={newAttrKey && newAttrValue} variant="primary">
                After typing attribute key and value press enterr on one of the
                field
              </Alert>

              <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  required
                  type="file"
                  multiple
                  name="images"
                  onChange={(e) => uploadHandler(e.target.files)}
                />
                {isCreating}
              </Form.Group>
              <Button variant="info" type="submit" size="md" className="mb-3">
                Create
              </Button>
              {createProductResponseState.error ?? ""}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CreateProductPageComponent;
