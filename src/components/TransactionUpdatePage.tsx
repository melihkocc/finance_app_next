"use client"
import { useTransactions } from '@/hooks/useTransaction'
import React, { useEffect, useState } from 'react'
import TransactionForm from './TransactionForm'
import convertDtoTransactionToTransaction from '@/utils/convertDtoTransactionToTransaction'

interface TransactionUpdatePageProps {
  id: number
}

function TransactionUpdatePage({ id }: TransactionUpdatePageProps) {
  const { dtoTransaction, getTransactionById } = useTransactions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      await getTransactionById(id);
      setLoading(false);
    };
    
    fetchTransaction();
  }, [id]);

  if (loading) {
    return <div className='text-center mt-5'>Yükleniyor...</div>;
  }

  if (!dtoTransaction) {
    return <div className='text-center mt-5'>Gelir - Gider bulunamadı.</div>;
  }

  const convertTransaction = convertDtoTransactionToTransaction(dtoTransaction);

  return (
    <div>
      <div className="text-center mt-10">Gelir - Gider Düzenleme</div>
      <TransactionForm transaction={convertTransaction} />
    </div>
  )
}

export default TransactionUpdatePage;
