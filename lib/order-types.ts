import type { CustomMatConfig, DeliveryMethod } from "./catalog";

export interface OrderItem {
  productId: string;
  name: string;
  detail?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  config?: CustomMatConfig;
}

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderDelivery {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  method: DeliveryMethod;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "confirmed";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  notes: string;
  currency: "USD";
}

export interface OrderIssue {
  field: string;
  message: string;
}
