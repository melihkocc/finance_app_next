import { getCookie } from "cookies-next/server"
import { cookies } from 'next/headers';

export const getToken = async () => {
    const token = await getCookie("token",{cookies});
    return token;
}