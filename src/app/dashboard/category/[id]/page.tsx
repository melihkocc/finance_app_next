import TransactionByCategoryPage from '@/components/TransactionByCategoryPage';
import React from 'react';

export default async function TransactionByCategory({
  params,
}: {
  params: Promise<{ id:any }>
}) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return <TransactionByCategoryPage id={numericId} />;
}

