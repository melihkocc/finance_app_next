import CategoryUpdatePage from '@/components/CategoryUpdatePage';
import React from 'react'

interface CategoryUpdateProps {
  params: {
      id: string;
  };
}

async function CategoryUpdate({params}:CategoryUpdateProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return (
    <CategoryUpdatePage id={numericId}/>
  )
}

export default CategoryUpdate