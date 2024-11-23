"use client";
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(2, "Kullanıcı adı en az 2 karakter olmalıdır").max(50, "Kullanıcı adı en fazla 50 karakter olmalıdır"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır").max(50, "Şifre en fazle 50 karakter olmalıdır")
});

function LoginForm() {
  const { login, loading, error } = useAuth();
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const username = searchParams.get('username')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values.username, values.password);
  };

  return (
    <div className='w-10/12 mx-auto mt-10'>
      {success === 'true' && (
        <div className="text-green-600 text-center mb-4">
          Başarıyla kayıt oldunuz. Lütfen giriş yapınız {username}!
        </div>
      )}
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
          <Button
            className='w-full bg-green-600 text-white hover:bg-green-500 transition-all duration-300'
            type="submit"
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </Form>
      <div className='mt-10 mb-2 text-center'>Henüz Kayıt Olmadıysanız?</div>
      <Link href={"/register"}>
        <Button className='w-full bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300'>
          Kayıt Ol
        </Button>
      </Link>
    </div>
  );
}

export default LoginForm;
