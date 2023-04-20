import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaComponent = ({
  title = "Winklet",
  description = "Shop here the best online products"
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaComponent;
