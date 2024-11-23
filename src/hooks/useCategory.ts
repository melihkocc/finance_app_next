// hooks/useCategory.ts
import { useState, useEffect } from 'react';
import { fetchCategory, addCategory, updateCategory, deleteCategory, fetchCategoryById } from '@/services/category';
import { Category, responseCategory } from '@/models/category';

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const data = await fetchCategory();
      setCategories(data.payload);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryById = async (id:number) => {
    setLoading(true);
    try {
      const data = await fetchCategoryById(id);
      setCategory(data.payload);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const createCategory = async (category: Partial<Category>) => {
    setLoading(true);
    try {
      const newCategory = await addCategory(category);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id: string, category: Partial<Category>) => {
    setLoading(true);
    try {
      const updatedCategory = await updateCategory(id, category);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      return updatedCategory
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (id: string) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    editCategory,
    removeCategory,
    loadCategory,
    getCategoryById,
    category
  };
};
