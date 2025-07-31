export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  isDouble?: boolean; // Para camarón que cuenta como doble
}

export interface CustomPizza {
  ingredients: string[];
  price: number;
  count: number;
}

export interface Specialty {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  isBoneless?: boolean;
  bonelessFlavors?: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface Boneless {
  id: string;
  flavor: string;
  price: number;
  count: number;
}

export interface Snack {
  id: string;
  name: string;
  price: number;
  description: string;
  unit: string;
  image: string;
  flavors?: {
    id: string;
    name: string;
    icon: string;
  }[];
}

export interface CartItem {
  id: string;
  type: 'custom' | 'specialty' | 'boneless' | 'snack';
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

export interface OrderData {
  orderNumber?: string;
  customerName: string;
  orderType: 'takeaway' | 'dine-in';
  items: CartItem[];
  total: number;
  phone?: string;
  address?: string;
  deliveryCost?: number;
  paymentMethod?: 'cash' | 'card';
}