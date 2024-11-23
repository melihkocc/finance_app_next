import CategoriesPageComponent from '@/components/CategoriesPageComponent'
import React, { Suspense } from 'react'

function CategoryPage() {
  return (
    <Suspense>
      <CategoriesPageComponent/>
    </Suspense>
  )
}

export default CategoryPage