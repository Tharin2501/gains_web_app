export type ProductProps = {
  data: {
    id: number;
    name: string;
    nutrition: {
      amount: number;
      unit: string;
    };
    price_history: {
      price: number;
      date: string;
    }[];
  }[];
};
