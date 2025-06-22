// src/types.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number | string; // si es string en el backend, puedes mantener ambos tipos
  stock: number;
  minStock: number;
  location: string;
  isActive: boolean;
  createdAt: string;
  categoryId: number;
  providerId: number;
  Category?: { name: string }; // se escribe con mayúscula
  Provider?: { name: string }; // igual que el backend
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

export interface Movement {
  id?: number;
  type: string;
  userName: string;
  productName: string;
  quantity: number;
  date: Date;
}

export interface Audit {
  id: number;
  userName: string;
  action: string;
  timestamp: number;
}

export interface Provider {
  id: number;
  name: string;
  contact: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
