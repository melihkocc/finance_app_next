import CategoriesPageComponent from "@/components/CategoriesPageComponent"
import React, { Suspense } from "react"

function CategoriesPage() {
  return (
    <Suspense>
      <CategoriesPageComponent/>
    </Suspense>
  )
}

export default CategoriesPage