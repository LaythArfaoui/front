import { OrderItem } from "./order-item";

export interface Order {
    id?: number;  
    userId: number;
    orderItems?: OrderItem[]; 
    status?: string; 
    client?: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
    };
    amount?: number;
    orderDate?: string;
    total?:string;
    comment?:string;
  

}
