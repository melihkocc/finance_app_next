"use client"
import { CookieValueTypes } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface LogoutProps {
    token: CookieValueTypes;
}

function Logout({ token }: LogoutProps) {
    const router = useRouter();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        deleteCookie("token");
        deleteCookie("refreshToken");
        setIsLoggedOut(true); // Çıkış yapıldığında state güncelleniyor
        router.push("/login");
    };

    // URL değiştiğinde bileşeni yeniden render etme
    useEffect(() => {
        if (isLoggedOut) {
            router.refresh(); // URL değiştiğinde sayfayı yenileme
        }
    }, [isLoggedOut, router]);

    return (
        <div>
            {token ? (
                <div 
                    onClick={handleLogout} 
                    className="ms-2 bg-red-600 text-white py-1 px-2 text-sm rounded-md cursor-pointer">
                    Çıkış Yap
                </div>
            ) : null}
        </div>
    );
}

export default Logout;
