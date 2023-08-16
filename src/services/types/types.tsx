export type TIngredients = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type?: string;
  __v?: number;
  _id: string;
  uuid?: string;
};

export type TTypeBun = "top" | "bottom" | undefined;

export type TIngredientId = {
  _id: string;
};

export type TOrders = {
  createdAt: string | Date;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string | Date;
  _id: string;
};
