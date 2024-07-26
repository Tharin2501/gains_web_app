import { ChangeEvent, FormEvent, useState } from "react";
import { CaloriesPerProductProps } from "./types/CaloriesPerProductProps";
import { ProductProps } from "./types/ProductProps";

export function InputForm({ product }: { product: ProductProps }) {
  const [amountOfProduct, setAmountOfProduct] = useState<string>("");
  const [submittedAmountOfProduct, setSubmittedAmountOfProduct] =
    useState<number>(0);
  const [weight, setWeight] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountOfProduct(value);
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWeight(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedAmountOfProduct((prev) => prev + Number(amountOfProduct));
    setAmountOfProduct("");
  };

  // TODO: Add mark as favorite button, and save to local storage
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amountOfProduct">Amount: </label>
        <input
          className="bg-gray-50 border border-gray-300"
          type="text"
          id="amountOfProduct"
          value={amountOfProduct}
          placeholder="E.g. how many eggs?"
          onChange={handleChange}
        />
        <label htmlFor="weight">Weight: </label>
        <input
          className="bg-gray-50 border border-gray-300"
          type="text"
          id="weight"
          value={weight}
          placeholder="E.g. weight of one egg?"
          onChange={handleWeightChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          Submit
        </button>
      </form>
      <CaloriesPerProduct
        kcalPer100g={CaloriesPer100g(product)}
        weight={Number(weight)}
        amount={submittedAmountOfProduct}
      />
    </div>
  );
}

export function CaloriesPer100g(product: ProductProps | undefined) {
  if (product !== undefined) {
    const nutrition = product.data
      .flatMap((product) => product.nutrition)
      .find((nutrition) => nutrition.unit === "kcal");
    if (nutrition !== undefined) {
      return nutrition.amount;
    }
  }
  return 0;
}

function CaloriesPerProduct({
  kcalPer100g,
  weight,
  amount,
}: CaloriesPerProductProps) {
  const kcalPerGramProduct = kcalPer100g / 100;
  const kcalPerEgg = weight * kcalPerGramProduct * amount;

  return (
    <p className="font-semibold">
      {kcalPerEgg !== undefined && `${kcalPerEgg} kcal`}
    </p>
  );
}
