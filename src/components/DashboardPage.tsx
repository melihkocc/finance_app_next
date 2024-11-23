import React from 'react'
import Categories from '@/components/Categories'
import Container from '@/components/Container'
import TransactionByAmount from '@/components/TransactionByAmount'
function DashboardPage() {
  return (
    <Container>
      <Categories/>
      <TransactionByAmount/>
    </Container>
  )
}

export default DashboardPage