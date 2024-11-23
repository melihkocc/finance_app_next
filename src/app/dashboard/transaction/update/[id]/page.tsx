import TransactionUpdatePage from '@/components/TransactionUpdatePage';
import React from 'react'

interface TransactionUpdateProps {
  params: {
      id: string;
  };
}

export default async function TransactionUpdate({
  params,
}: {
  params: Promise<{ id:any }>
})  {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return (
    <TransactionUpdatePage id={numericId}/>
  )
}