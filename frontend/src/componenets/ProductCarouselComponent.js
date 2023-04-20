import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = ({ bestsellers }) => {
  const cursorPointer = { cursor: "pointer" };
  return (
    <>
      {bestsellers.length > 0 ? (
        <Carousel>
          {bestsellers.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img
                crossOrigin="anonymous"
                style={{ height: "300px", objectFit: "cover" }}
                className="d-block w-100"
                src={item.images ? item.images[0].path : null}
                alt="First slide"
              />
              <Carousel.Caption>
                <LinkContainer
                  style={cursorPointer}
                  to={`/product-details/${item._id}`}
                >
                  <h3>Best Seller {item.category}</h3>
                </LinkContainer>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
    </>
  );
};
export default ProductCarouselComponent;
