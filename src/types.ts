export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface ApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}