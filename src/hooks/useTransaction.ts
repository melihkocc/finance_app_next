import { useState, useEffect } from 'react';
import { DtoTransaction, Transaction } from '@/models/transaction';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction, fetchTransactionById,fetchTransactionByCategory, fetchTransactionsByAmountRange } from '@/services/transaction';
import { object } from 'zod';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dtoTransactions, setDtoTranscations] = useState<DtoTransaction[]>([]);
  const [dtoTransaction, setDtoTranscation] = useState<DtoTransaction>();
  const [loading, setLoading] = useState(false);
  const [categoryTransactions, setCategoryTransactions] = useState<DtoTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();
      setDtoTranscations(data.payload);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionById = async (id:number) => {
    setLoading(true);
    try {
      const data = await fetchTransactionById(id);
      setDtoTranscation(data.payload);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const createTransaction = async (transaction: Partial<Transaction>) => {
    setLoading(true);
    try {
      const newTransaction = await addTransaction(transaction);
      setTransactions((prev) => [...prev, newTransaction]);
      return newTransaction;
    } catch (err: any) {
      setError(err.message || "Beklenmeyen bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };
  

  const editTransaction = async (id: string, transaction: Partial<Transaction>) => {
    setLoading(true);
    try {
      const updatedTransaction = await updateTransaction(id, transaction);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updatedTransaction : t))
      );
      return updatedTransaction;
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTransaction = async (id: string) => {
    setLoading(true);
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionByCategory = async (id: number) => {
    setLoading(true);
    try {
      const data = await fetchTransactionByCategory(id);
      setCategoryTransactions(data.payload);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const getTransactionsByAmountRange = async (
    minAmount?: number | undefined,
    maxAmount?: number | undefined,
  ) => {
    setLoading(true);
    try {
      const data = await fetchTransactionsByAmountRange(
        minAmount,
        maxAmount,
      );
      setDtoTranscations(data.payload);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    dtoTransactions,
    dtoTransaction,
    loading,
    error,
    createTransaction,
    editTransaction,
    removeTransaction,
    loadTransactions,
    getTransactionById,
    getTransactionByCategory,
    categoryTransactions,
    getTransactionsByAmountRange
  };
};
