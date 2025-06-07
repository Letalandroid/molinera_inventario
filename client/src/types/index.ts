export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  dni: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
