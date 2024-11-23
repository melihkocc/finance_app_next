"use client"
import { useCategory } from '@/hooks/useCategory';
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
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Category } from '@/models/category';

const categorySchema = z.object({
    name: z.string().min(2, 'Başlık en az 2 karakter olmalı').max(50, 'Başlık en fazla 50 karakter olabilir'),
})

type CategoryFormProps = {
    category?: Category;
    onSuccess?: () => void;
};

function CategoryForm({ category, onSuccess }: CategoryFormProps) {
    const { createCategory, editCategory, loading, error } = useCategory();

    const router = useRouter();

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || ''
        },
    });


    const onSubmit = async (data: z.infer<typeof categorySchema>) => {
        const cookieValue = getCookie("id");

        const userId = typeof cookieValue === 'string' ? parseInt(cookieValue, 10) : 0;

        const formattedData = {
            ...data,
            userId,
        };


        if (category?.id) {
            const response = await editCategory(category.id, formattedData);
            if (response.status === 200) {
                router.push("/dashboard/category?edited=true");
            }
        } else {
            const response = await createCategory(formattedData);
            if (response.status === 200) {
                router.push("/dashboard/category?success=true");
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori Adı</FormLabel>
                                <FormControl>
                                    <Input placeholder="Başlık girin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-500 w-full text-white" disabled={loading}>
                        {category ? 'Güncelle' : 'Ekle'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default CategoryForm;
