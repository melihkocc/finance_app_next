"use client"
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { useCategory } from '@/hooks/useCategory'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'

function CategoriesPage() {
  const router = useRouter();
  const { categories, removeCategory, loading, error } = useCategory();
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

  const handleUpdate = (id: any) => {
    router.push(`/dashboard/category/update/${id}`)
  }

  const handleDelete = (id: any) => {
    removeCategory(id);

    router.push("/dashboard/category/?remove=true");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (loading) {
    return <div className='text-center'>Yükleniyor...</div>;
  }

  if (error) {
    return <div className='text-center text-red-500'>Hata: {error}</div>;
  }

  return (
    <Suspense>
      <Container>
        <div className='text-center mt-10'>Kategoriler</div>
        {
          showSuccess && (
            <div className='flex justify-center items-center'>
              <Button size={"sm"} className='bg-green-200 text-green-600 mb-5 hover:bg-green-200 cursor-auto mt-5'>
                Kategori Başarıyla Eklendi
              </Button>
            </div>
          )
        }
        {
          showRemove && (
            <div className='flex justify-center items-center'>
              <Button size={"sm"} className='bg-red-200 text-red-600 mb-5 hover:bg-red-200 cursor-auto mt-5'>
                Kategori Başarıyla Silindi
              </Button>
            </div>
          )
        }
        {
          showEdited && (
            <div className='flex justify-center items-center'>
              <Button size={"sm"} className='bg-orange-200 text-orange-600 mb-5 hover:bg-orange-200 cursor-auto mt-5'>
                Kategori Başarıyla Güncellendi
              </Button>
            </div>
          )
        }
        <div className='flex justify-center items-center'>
          <Button onClick={() => router.push("/dashboard/category/add")} size={"sm"} className='ms-3 mt-5 bg-green-600 hover:bg-green-700 transition-all duration-500 ease-in-out'>
            Kategori Ekle
          </Button>
        </div>
        <div className='grid lg:grid-cols-6 grid-cols-2 gap-10 px-10 mt-5'>
          {
            categories.map((category, index) => {
              return <div key={index}>
                <div className={`text-center flex flex-col bg-orange-500 py-2 rounded-tr-lg rounded-tl-lg text-white`}>
                  <div className='text-md'>Kategori Adı</div>
                  <div className='text-md'>{category.name}</div>
                </div>
                <div className='flex flex-col items-center mt-2 shadow-md border-b rounded-bl-lg rounded-br-lg'>
                  <div className='flex items-center justify-center w-full mt-2 pb-2 '>
                    <Button onClick={() => handleUpdate(category.id)} size={"sm"} className='text-sm bg-orange-500 hover:bg-orange-600 transition-all ease-in-out duration-500'><FaPencil size={20} /></Button>
                    <Button onClick={() => handleDelete(category.id)} size={"sm"} className='text-sm ms-3 bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-500'><MdDelete size={20} /></Button>
                  </div>
                </div>
              </div>
            })
          }

        </div>
      </Container>
    </Suspense>
  )
}

export default CategoriesPage
