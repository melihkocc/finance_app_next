"use client";
import React, { useState, useEffect } from 'react';
import { useCategory } from '@/hooks/useCategory';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

function Categories() {
  const { categories, loading, error, loadCategory } = useCategory();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const remove = searchParams.get('remove');
  const edited = searchParams.get('edited');

  const [showSuccess, setShowSuccess] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showEdited, setShowEdited] = useState(false);

  useEffect(() => {
    if (success === "true") {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }

    if (remove === "true") {
      setShowRemove(true);
      setTimeout(() => {
        setShowRemove(false);
      }, 3000);
      
    }

    if (edited === "true") {
      setShowEdited(true);
      setTimeout(() => {
        setShowEdited(false);
      }, 3000);
      
    }
  }, [success, remove, edited]);


  if (loading) {
    return <div className='text-center'>Yükleniyor...</div>;
  }

  if (error) {
    return <div className='text-center text-red-500'>Hata: {error}</div>;
  }

  return (
    <Suspense>
      {
        showSuccess && (
          <div className='flex justify-center items-center'>
            <Button size={"sm"} className='bg-green-200 text-green-600 mb-5 hover:bg-green-200 cursor-auto'>
              Gelir Gider Başarıyla Eklendi
            </Button>
          </div>
        )
      }
      {
        showRemove && (
          <div className='flex justify-center items-center'>
            <Button size={"sm"} className='bg-red-200 text-red-600 mb-5 hover:bg-red-200 cursor-auto'>
              Gelir Gider Başarıyla Silindi
            </Button>
          </div>
        )
      }
      {
        showEdited && (
          <div className='flex justify-center items-center'>
            <Button size={"sm"} className='bg-orange-200 text-orange-600 mb-5 hover:bg-orange-200 cursor-auto'>
              Gelir Gider Başarıyla Güncellendi
            </Button>
          </div>
        )
      }
      <div className='flex justify-center items-center mb-5'>
        <Button onClick={() => router.push("/dashboard/transaction/add")} size={"sm"} className='bg-green-600 hover:bg-green-700 transition-all duration-500 ease-in-out'>
          Gelir Gider Ekle
        </Button>
        <Button onClick={() => router.push("/dashboard/category")} size={"sm"} className='ms-3 bg-green-600 hover:bg-green-700 transition-all duration-500 ease-in-out'>
          Kategoriler
        </Button>
      </div>
      <div className='w-full px-20 flex justify-center items-center'>
        {
          categories.length > 0 ?
            <>
              {
                categories.map((category, index) => {
                  return <div onClick={() => router.push(`/dashboard/category/${category.id}`)} className='text-orange-500 hover:text-green-500 font-bold transition-all ms-3 ease-in-out duration-700 cursor-pointer' key={index}>{category.name}</div>
                })
              }
            </>
            :
            <div>Henüz Kategori Eklemediniz</div>
        }
      </div>
    </Suspense>
  );
}

export default Categories;
