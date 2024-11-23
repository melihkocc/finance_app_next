"use client"
import { useTransactions } from '@/hooks/useTransaction'
import { DtoTransaction, Transaction } from '@/models/transaction'
import { formatDateWithDay } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { FaPencil } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'

interface TransactionCardProps {
    transaction: DtoTransaction
}

function TransactionCard({ transaction }: TransactionCardProps) {

    const { removeTransaction } = useTransactions();
    const router = useRouter();


    const handleUpdate = (id: any) => {
        router.push(`/dashboard/transaction/update/${id}`)
    }

    const handleDelete = (id: any) => {
        removeTransaction(id);

        router.push("/dashboard?remove=true");

        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    if (!transaction.category) {
        return <div className="text-red-500">Kategori bilgisi eksik.</div>;
    }  
    return (
        <div>
            <div className={`text-center flex flex-col ${transaction.transactionType === "INCOME" ? "bg-green-500" : "bg-red-500"} py-2 rounded-tr-lg rounded-tl-lg text-white`}>
                <div className='text-sm'>{formatDateWithDay(transaction.createTime)}</div>
                <div className='text-sm'>{formatDateWithDay(transaction.endDate)}</div>
            </div>
            <div className='flex flex-col items-center mt-2 shadow-md border-b rounded-bl-lg rounded-br-lg'>
                <div className={`w-full text-center h-14 border-b pb-2 ${transaction.transactionType === "INCOME" ? "text-green-500" : "text-red-500"}  font-bold`}>
                    <div>{transaction.title}</div>
                    <div className='text-sm font-light'>{transaction.description}</div>
                </div>
                <div className='flex flex-col border-b mt-2 items-center w-full'>
                    {
                        transaction.transactionType === "INCOME" ? <div className='text-sm'>Gelir</div> : <div className='text-sm'>Gider</div>
                    }
                    <div className={`${transaction.transactionType === "INCOME" ? "text-green-500" : "text-red-500"} font-semibold pb-2`}>{transaction.transactionType === "INCOME" ? "+" : "-"} {transaction.amount} TL</div>
                </div>
                <div className='flex flex-col border-b items-center w-full mt-2'>
                    <div className='text-sm'>Kategori</div>
                    <div className={`${transaction.transactionType === "INCOME" ? "text-green-500" : "text-red-500"} font-semibold pb-2`}>
                        {transaction.category?.name || "Kategori Bulunamadı"}
                    </div>
                </div>
                <div className='flex items-center justify-center w-full mt-2 pb-2 '>
                    <Button onClick={() => handleUpdate(transaction.id)} size={"sm"} className='text-sm bg-orange-500 hover:bg-orange-600 transition-all ease-in-out duration-500'><FaPencil size={20} /></Button>
                    <Button onClick={() => handleDelete(transaction.id)} size={"sm"} className='text-sm ms-3 bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-500'><MdDelete size={20} /></Button>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard