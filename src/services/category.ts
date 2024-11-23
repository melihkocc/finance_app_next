// services/category.ts
import { apiRequest } from './api';
import { Category, responseCategories, responseCategory } from '@/models/category';

const END_POINT = "/rest/api/category";

export const fetchCategory = async (): Promise<responseCategories> => {
  const response = await apiRequest(`${END_POINT}/get`, {
    method: "GET",
  });
  return response;
};


export const fetchCategoryById = async (id:number): Promise<responseCategory> => {
  return await apiRequest(`${END_POINT}/get/${id}`,{
      method:"GET"
  })

};

export const addCategory = async (category: Partial<Category>) => {
  const newCategory = await apiRequest(`${END_POINT}/save`, {
    method: "POST",
    body: JSON.stringify(category),
  });
  return newCategory;
};

export const updateCategory = async (id: string, category: Partial<Category>) => {
  const updatedCategory = await apiRequest(`${END_POINT}/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  await apiRequest(`${END_POINT}/delete/${id}`, {
    method: "DELETE",
  });
};
