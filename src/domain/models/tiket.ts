export interface Product {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  legacyId: string;
  price: string;
  alcoholCount: number;
  soldAlone: boolean;
  availability: string;
  providerAvailability: null;
  category: Category;
}

export interface Category {
  uuid: string;
  name: string;
  sortPosition: number;
  products: Product[];
}

export type ProductsResponse = Category[];

export interface UpdateProductResponse {
  result: Product;
  status: string;
}

export interface UpdateProductRequest {
  availability: "UNAVAILABLE" | "AVAILABLE";
  productId: string;
}
