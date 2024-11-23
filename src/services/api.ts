import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const API_URL = process.env.API_URL;

export const apiRequest = async (endpoint: string, options:any = {}) => {
  const token = getCookie('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });


    if (response.status === 401) {
      deleteCookie("token");
      deleteCookie("refreshToken");
      window.location.replace("/login");
    }

    // API yanıtı başarısızsa
    if (!response.ok) {
      const errorData = await response.json();

      const errorMessage = errorData.exception?.message 
        ? JSON.stringify(errorData.exception.message) 
        : 'Sistem Hatası. Daha sonra tekrar deneyiniz.';
        
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err: any) {

    if (err.response) {
      throw new Error(`API Hatası: ${JSON.stringify(err.response.data)}`);
    }

    // Diğer hatalar için genel bir mesaj
    throw new Error(err.message || "Bilinmeyen bir hata oluştu");
  }
};

