import Categories from '@/components/Categories'
import Container from '@/components/Container'
import DashboardTab from '@/components/DashboardTab'
import TransactionByAmount from '@/components/TransactionByAmount'
import React from 'react'

function Dashboard() {
  return (
    <Container>
      <Categories/>
      <TransactionByAmount/>
    </Container>
  )
}

export default Dashboard