import Categories from '@/components/Categories'
import Container from '@/components/Container'
import TransactionByAmount from '@/components/TransactionByAmount'
import React from 'react'
import { Suspense } from 'react';

function Dashboard() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Categories />
        <TransactionByAmount />
      </Suspense>
    </Container>
  )
}

export default Dashboard
