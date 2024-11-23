import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/services/auth';
import { setCookie } from 'cookies-next'

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser({ username, password });
      console.log(data)
      setCookie("token", data.payload.accessToken)
      setCookie("refreshToken",data.payload.refreshToken)
      setCookie("id",data.payload.id)
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username : string, password : string) =>  {
    setLoading(true)
    setError(null)
    try {
      const data = await registerUser({ username, password });
      router.push(`/login?success=true&username=${data.payload.username}`)
    } catch (error:any) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  return { login, register, loading, error };
};
