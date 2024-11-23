import { Category } from "./category";

export interface Transaction {
    id: string;
    title: string;
    description?: string;
    amount: number;
    createTime: string;
    endDate: string;
    transactionType: 'INCOME' | 'EXPENSE';
    userId: number;
    categoryId: number;
  }

export interface responseTransactions {
  payload : DtoTransaction[];
  status: number;
}

export interface responseTransaction {
  payload : DtoTransaction;
  status: number;
}
  
export interface DtoTransaction{
  id: string;
  title: string;
  description?: string;
  amount: number;
  createTime: string;
  endDate: string;
  transactionType: 'INCOME' | 'EXPENSE';
  user: number;
  category: Category;
}