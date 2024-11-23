import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { DtoTransaction } from '@/models/transaction'
import { Button } from './ui/button';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { formatDateWithDay } from '@/utils/formatDate'
import { useRouter } from 'next/navigation';
import { useTransactions } from '@/hooks/useTransaction';
import TransactionCard from './TransactionCard';

interface CarouselComponentProps {
    transactions: DtoTransaction[];
}

function CarouselComponent({ transactions }: CarouselComponentProps) {

    const { removeTransaction } = useTransactions();

    const router = useRouter()

    const handleUpdate = (id:any) => {
        router.push(`/dashboard/transaction/update/${id}`)
    }

    const handleDelete = (id: any) => {
        removeTransaction(id);
      
        router.push("/dashboard?remove=true");
      
        setTimeout(() => {
          window.location.reload();
        }, 100);
      };

    return (
        <div className='lg:w-10/12 w-4/5 mx-auto'>
            <Carousel>
                <CarouselContent className='px-10'>
                    {
                        transactions.map((transaction,index) => {
                            return <CarouselItem key={index} className="lg:basis-1/3 basis-full p-2">
                                <TransactionCard transaction={transaction}/>
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CarouselComponent