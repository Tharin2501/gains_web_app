import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { InputForm } from "./inputForm";
import { ProductProps } from "./types/ProductProps";
import { Header } from "./Header";

function App() {
  const [product, setProduct] = useState<ProductProps>();

  const token = import.meta.env.VITE_REACT_APP_KASSALAPP_AUTH_TOKEN;

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(
          "https://kassal.app/api/v1/products?search=Coop_Frokostegg_fra_Frittgående_Høner_L_12pk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error: unknown) {
        throw new Error(`Error: ${error}`);
      }
    }

    getProduct();
  }, [token]);

  return (
    <>
      <Header />
      {product !== undefined && <InputForm product={product} />}
    </>
  );
}

export default App;
