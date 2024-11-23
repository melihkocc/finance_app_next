"use client"
import { useCategory } from '@/hooks/useCategory';
import { useTransactions } from '@/hooks/useTransaction';
import { DtoTransaction, Transaction } from '@/models/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO } from 'date-fns'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

// Zod şeması
const transactionSchema = z.object({
  title: z.string().min(2, 'Başlık en az 2 karakter olmalı').max(50, 'Başlık en fazla 50 karakter olabilir'),
  description: z.string().optional(),
  amount: z.number().positive('Tutar pozitif bir sayı olmalıdır'),
  transactionType: z.enum(['INCOME', 'EXPENSE']),
  createTime: z.string().nonempty('Oluşturma tarihi seçilmelidir'),
  endDate: z.string().nonempty('Bitiş tarihi seçilmelidir'),
  categoryId: z.number().positive('Geçerli bir kategori seçmelisiniz'),
}).refine((data) => {
  const create = new Date(data.createTime);
  const end = new Date(data.endDate);
  return end >= create;
}, {
  message: 'Bitiş tarihi, oluşturma tarihinden önce olamaz',
  path: ['endDate']
});

type TransactionFormProps = {
  transaction?: Transaction;
  onSuccess?: () => void;
};

function TransactionForm({ transaction, onSuccess }: TransactionFormProps) {
  const { createTransaction, editTransaction, loading, error } = useTransactions();
  const { categories } = useCategory();
  const [createTime, setCreateTime] = React.useState<Date | undefined>(
    transaction?.createTime ? parseISO(transaction.createTime) : new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    transaction?.endDate ? parseISO(transaction.endDate) : new Date()
  );
  const router = useRouter();
  
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: transaction?.title || '',
      description: transaction?.description || '',
      amount: transaction?.amount || 0,
      transactionType: transaction?.transactionType || 'INCOME',
      categoryId: transaction?.categoryId || (categories[0]?.id ? Number(categories[0].id) : 0),
      createTime: transaction?.createTime || '',
      endDate: transaction?.endDate || '',
    },
  });


  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    const cookieValue = getCookie("id");
  
    const userId = typeof cookieValue === 'string' ? parseInt(cookieValue, 10) : 0;
  
    const formattedData = {
      ...data,
      createTime: createTime ? format(createTime, 'yyyy-MM-dd') : '',
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      userId,
    };
  
  
    if (transaction?.id) {
      console.log("edited data",formattedData)
      const response = await editTransaction(transaction.id, formattedData);
        if(response.status===200){
        router.push("/dashboard?edited=true");
      }
    } else {
      const response = await createTransaction(formattedData);
      if(response.status===200){
        router.push("/dashboard?success=true");
      }
    }
    if (onSuccess) onSuccess();
  };
  

  return (
    <div className='flex justify-center items-center'>
      {
        error ? 
        <div>Error Var</div>
        :
        <div></div>
      }
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:w-8/12 w-11/12">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlık</FormLabel>
                <FormControl>
                  <Input placeholder="Başlık girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between items-center gap-5'>
            <div className='space-y-5'>
              <FormLabel>Oluşturma Tarihi</FormLabel>
              <Calendar
                mode="single"
                selected={createTime}
                onSelect={(date) => {
                  setCreateTime(date);
                  form.setValue('createTime', date ? format(date, 'yyyy-MM-dd') : '');
                }}
                className="rounded-md"
              />
              {form.formState.errors.createTime && (
                <p className="text-red-600">{form.formState.errors.createTime.message}</p>
              )}
            </div>

            <div className='space-y-5'>
              <FormLabel>Bitiş Tarihi</FormLabel>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  form.setValue('endDate', date ? format(date, 'yyyy-MM-dd') : '');
                }}
                className="rounded-md"
              />
              {form.formState.errors.endDate && (
                <p className="text-red-600">{form.formState.errors.endDate.message}</p>
              )}
            </div>
          </div>


          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Açıklama</FormLabel>
                <FormControl>
                  <Input placeholder="Açıklama (Opsiyonel)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tutar</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Tutar"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İşlem Tipi</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="İşlem Tipi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INCOME">Gelir</SelectItem>
                    <SelectItem value="EXPENSE">Gider</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kategori Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-500 w-full text-white" disabled={loading}>
            {transaction ? 'Güncelle' : 'Ekle'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TransactionForm;
