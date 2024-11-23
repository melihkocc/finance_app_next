import { apiRequest } from './api';
import { responseTransactions, responseTransaction, Transaction } from '@/models/transaction';

const END_POINT = "/rest/api/transaction"

interface AmountRangeParams {
    minAmount?: number;
    maxAmount?: number;
  }

export const fetchTransactions = async (): Promise<responseTransactions> => {

    return await apiRequest(`${END_POINT}/get`, {
        method: "GET"
    })

};

export const fetchTransactionById = async (id: number): Promise<responseTransaction> => {

    return await apiRequest(`${END_POINT}/get/${id}`, {
        method: "GET"
    })

};

export const addTransaction = async (transaction: Partial<Transaction>) => {

    return await apiRequest(`${END_POINT}/save`, {
        method: "POST",
        body: JSON.stringify(transaction)
    });

};

export const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {

    return await apiRequest(`${END_POINT}/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(transaction)
    });

};

export const deleteTransaction = async (id: string) => {

    return await apiRequest(`${END_POINT}/delete/${id}`, {
        method: "DELETE"
    });

};

export const fetchTransactionByCategory = async (id: number) => {
    return await apiRequest(`${END_POINT}/get-by-category/${id}`, {
        method: "GET"
    })
}

export const fetchTransactionsByAmountRange = async (
    minAmount?: number,
    maxAmount?: number,
): Promise<responseTransactions> => {
    const params: AmountRangeParams = {};

    let data;
    if (minAmount && maxAmount===undefined){
        params.minAmount = minAmount;
        data = await apiRequest(`${END_POINT}/get-by-amount-range?minAmount=${minAmount}`, {
            method: "GET",
        });
    } 
    if (maxAmount && minAmount===undefined){
        params.maxAmount = maxAmount;
        data = await apiRequest(`${END_POINT}/get-by-amount-range?maxAmount=${maxAmount}`, {
            method: "GET",
        });
    }
    if(maxAmount!==undefined && minAmount!==undefined){
        params.minAmount = minAmount;
        params.maxAmount = maxAmount;
        data = await apiRequest(`${END_POINT}/get-by-amount-range?minAmount=${minAmount}&maxAmount=${maxAmount}`, {
            method: "GET",
        });
    }

    return data
};
