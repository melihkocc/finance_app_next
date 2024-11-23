"use client";

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactions } from '@/hooks/useTransaction';
import { DtoTransaction } from '@/models/transaction';
import CarouselComponent from './CarouselComponent';

interface DashboardTabProps{
  dtoTransactions : DtoTransaction[];
}

function DashboardTab({dtoTransactions}:DashboardTabProps) {
  const [incomes, setIncomes] = useState<DtoTransaction[]>([]);
  const [expenses, setExpense] = useState<DtoTransaction[]>([]);
  const [ totalAmount, setTotalAmount ] = useState(0);

  const { loading, error } = useTransactions();

  useEffect(() => {
    const total = dtoTransactions.reduce((sum, transaction) => {
      const amount = transaction.transactionType === "INCOME" ? transaction.amount : -transaction.amount;
      return sum + amount;
    }, 0);
    setTotalAmount(total);
  }, [dtoTransactions]);

  useEffect(() => {

    setIncomes(dtoTransactions.filter((transaction) => transaction.transactionType === "INCOME"));
    setExpense(dtoTransactions.filter((transaction) => transaction.transactionType === "EXPENSE"));
  }, [dtoTransactions]); 

  if(loading){
    <div className='text-center'>Yükleniyor...</div>
  }
  if(error){
    <div className='text-center'>{error}</div>
  }
  return (
    <div className='w-full mt-10'>
      {
        totalAmount>0 ? 
        <div className='text-center text-green-500 font-semibold mb-3'>{totalAmount} TL kârdasınız</div>
        :
        <div className='text-center text-red-500 font-semibold mb-3'>{totalAmount} TL zarardasınız</div>

      }
      <Tabs defaultValue="income" className="w-full">
        <TabsList className='w-full flex justify-center items-center bg-white'>
          <TabsTrigger value="income">Gelirler</TabsTrigger>
          <TabsTrigger className='ms-3' value="expense">Giderler</TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          {incomes.length > 0 ? (
            <div>
              <CarouselComponent transactions={incomes} />
            </div>
          ) : (
            <div className='text-center'>Henüz Bir Geliriniz Bulunmamaktadır.</div>
          )}
        </TabsContent>

        <TabsContent value="expense">
          {expenses.length > 0 ? (
            <div>
              <CarouselComponent transactions={expenses} />
            </div>
          ) : (
            <div className='text-center'>Henüz Bir Gideriniz Bulunmamaktadır.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DashboardTab;
