"use client"
import { useCategory } from '@/hooks/useCategory';
import React, { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm';

interface CategoryUpdatePageProps {
    id: number
  }

function CategoryUpdatePage({id}:CategoryUpdatePageProps) {
  const { category, getCategoryById } = useCategory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      await getCategoryById(id);
      setLoading(false);
    };
    
    fetchCategory();
  }, [id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!category) {
    return <div>Kategori bulunamadı.</div>;
  }

  return (
    <div>
      <div className="text-center mt-10">Kategori Düzenleme</div>
      <CategoryForm category={category} />
    </div>
  )
}

export default CategoryUpdatePage