"use client"
import { useCategory } from '@/hooks/useCategory';
import { useTransactions } from '@/hooks/useTransaction'
import React, { useEffect, useState } from 'react'
import TransactionCard from './TransactionCard';

interface TransactionByCategoryPageProps {
  id: number
}

function TransactionByCategoryPage({id} : TransactionByCategoryPageProps) {
  const { categoryTransactions, getTransactionByCategory, loading:transactionLoading } = useTransactions();
  const { category, getCategoryById,loading:categoryLoading } = useCategory();
  const [ totalAmount, setTotalAmount ] = useState(0);

  useEffect(() => {
    const fetchTransaction = async () => {
      await getTransactionByCategory(id);
      await getCategoryById(id);
    };
  
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    const total = categoryTransactions.reduce((sum, transaction) => {
      const amount = transaction.transactionType === "INCOME" ? transaction.amount : -transaction.amount;
      return sum + amount;
    }, 0);
    setTotalAmount(total);
  }, [categoryTransactions]);
  
  if (!categoryTransactions.length) {
    return <div className='text-center mt-5'>Bu Kategoriye Ait Gelir - Gider bulunamadı.</div>;
  }


  if (transactionLoading || categoryLoading) {
    return <div className='text-center mt-5'>Yükleniyor...</div>;
  }

  if (!categoryTransactions) {
    return <div className='text-center mt-5'>Bu Kategoriye Ait Gelir - Gider bulunamadı.</div>;
  }



  return (
    <div>
      <div className='text-center mt-10 text-orange-500 font-bold'>{category?.name}</div>
      {
        totalAmount > 0 ? 
        <div className='text-center text-green-500'>Bu Kategoride {totalAmount} TL kârdasınız.</div>
        :
        <div className='text-center text-red-500'>Bu Kategoride {totalAmount} TL zarardasınız.</div>
      }
      <div className='px-10 grid lg:grid-cols-4 grid-cols-1 gap-10 mt-5'>
        {
          categoryTransactions.length>0  && categoryTransactions.map((transaction,index) => {
            return <div key={index}><TransactionCard transaction={transaction}/></div>
          })
        }
      </div>
    </div>
  )
}

export default TransactionByCategoryPage