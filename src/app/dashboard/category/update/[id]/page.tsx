import CategoryUpdatePage from '@/components/CategoryUpdatePage';
import React from 'react'

interface CategoryUpdateProps {
  params: {
      id: string;
  };
}

export default async function CategoryUpdate({
  params,
}: {
  params: Promise<{ id:any }>
})  {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return (
    <CategoryUpdatePage id={numericId}/>
  )
}

