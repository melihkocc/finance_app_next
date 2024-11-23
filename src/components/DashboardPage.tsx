"use client"
import React from 'react'
import Categories from '@/components/Categories'
import Container from '@/components/Container'
import TransactionByAmount from '@/components/TransactionByAmount'
import { Suspense } from 'react'
function DashboardPage() {
  return (
    <Container>
      <Suspense>
        <Categories/>
      </Suspense>
      <TransactionByAmount/>
    </Container>
  )
}

export default DashboardPage