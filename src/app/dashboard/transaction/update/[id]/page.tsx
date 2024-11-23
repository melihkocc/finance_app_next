import TransactionUpdatePage from '@/components/TransactionUpdatePage';
import React from 'react'

interface TransactionUpdateProps {
  params: {
      id: string;
  };
}

async function TransactionUpdate({params}:TransactionUpdateProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return (
    <TransactionUpdatePage id={numericId}/>
  )
}

export default TransactionUpdate