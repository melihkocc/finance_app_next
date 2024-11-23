import TransactionByCategoryPage from '@/components/TransactionByCategoryPage';
import React from 'react'

interface TransactionByCategoryProps {
  params: {
      id: string;
  };
}


async function TransactionByCategory({params} : TransactionByCategoryProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return (
    <TransactionByCategoryPage id={numericId}/>
  )
}

export default TransactionByCategory