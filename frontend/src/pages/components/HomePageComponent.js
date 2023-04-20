import ProductCarouselComponent from "../../componenets/ProductCarouselComponent";
import CategoryCardComponent from "../../componenets/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import MetaComponent from "../../componenets/MetaComponent";

const HomePageComponent = ({ categories, getBestsellers }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestsellers, setBestSellers] = useState([]);

  useEffect(() => {
    getBestsellers()
      .then((data) => {
        setBestSellers(data);
      })
      .catch((err) => {
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        );
      });
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [getBestsellers, categories]);

  return (
    <>
      <MetaComponent />
      <ProductCarouselComponent bestsellers={bestsellers} />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;
