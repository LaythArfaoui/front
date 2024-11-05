import { Food } from "./food";

export interface OrderItem {
    foodId: number;
    quantity: number;
    food: Food;  
}
