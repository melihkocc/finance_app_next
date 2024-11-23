import { Transaction } from '@/models/transaction'

export interface Category {
    id: string;
    name: string;
    transactions?: Transaction[];
    userId:number;
  }
  
export interface responseCategories {
  payload : Category[];
  status: number;
}

export interface responseCategory {
  payload : Category;
  status : number;
}