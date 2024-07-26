import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { CaloriesPer100g, InputForm } from "./inputForm";
import { ProductProps } from "./types/ProductProps";

function App() {
  const [product, setProduct] = useState<ProductProps>();
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  const token = import.meta.env.VITE_REACT_APP_KASSALAPP_AUTH_TOKEN;

  useEffect(() => {
    async function getProduct() {
      setError("");
      if (search !== "") {
        try {
          const response = await axios.get(
            `https://kassal.app/api/v1/products?search=${search}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProduct(response.data);
          setSearch("");
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError("This product could not be found, please try again.");
          }
        }
      }
    }

    getProduct();
  }, [search, token]);

  return (
    <>
      <Header />
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 mt-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a product"
      />
      {error ? (
        <p className="font-semibold">{error}</p>
      ) : (
        <>
          {product !== undefined && !error && (
            <p className="font-semibold pt-2">
              {CaloriesPer100g(product)} Kcal per 100g
            </p>
          )}
        </>
      )}
      {product !== undefined && (
        <div className="mt-8">
          <p className="text-lg font-normal text-gray-400">
            Need specific amount?
          </p>
          <InputForm product={product} />
        </div>
      )}
    </>
  );
}

export default App;
