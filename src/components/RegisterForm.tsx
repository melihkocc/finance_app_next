"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from '@/hooks/useAuth';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

// Zod ile form validasyonu
const formSchema = z.object({
    username: z.string().min(2, { message: "Kullanıcı adı en az 2 karakter olmalıdır." }).max(50),
    password: z.string().min(6, { message: "Parola en az 6 karakter olmalıdır." }).max(50),
    repassword: z.string().min(6, { message: "Parola tekrarı en az 6 karakter olmalıdır." }).max(50)
}).refine(data => data.password === data.repassword, {
    message: "Parolalar eşleşmiyor.",
    path: ["repassword"],
});

function RegisterForm() {
    const { register, loading, error } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            repassword: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await register(values.username, values.password);
    };

    return (
        <div className='w-10/12 mx-auto mt-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kullanıcı Adı</FormLabel>
                                <FormControl>
                                    <Input placeholder="Kullanıcı Adı" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parola</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Parola" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="repassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parola Tekrar</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Parola Tekrar" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={loading}
                        className='w-full bg-green-600 text-white hover:bg-green-500 transition-all duration-300'
                        type="submit"
                    >
                        {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                    </Button>
                </form>
            </Form>

            <div className='mt-10 mb-2 text-center'>Zaten Hesabın Var Mı?</div>
            <Link href={"/login"}>
                <Button className='w-full bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white transition-all ease-out duration-300'>
                    Giriş Yap
                </Button>
            </Link>
        </div>
    )
}

export default RegisterForm;
