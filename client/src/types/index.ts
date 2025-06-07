export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export type Role = "ADMINISTRADOR" | "EMPLEADO";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  Profile?: { name: string };
}

export interface UserLogin {
  email: string;
  password: string;
}
