import React from 'react'
import { Pacifico } from 'next/font/google'
import Link from 'next/link'
import { Button } from './ui/button'
import { getToken } from '@/hooks/token'
import Logout from './Logout'

const font = Pacifico({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
  })
  
async function Header() {

  const token = await getToken();

  return (
    <div className='w-full p-5 flex justify-center relative items-center border-b shadow-md'>
      {
        token ?
        <Link className='absolute lg:left-10 left-1' href={"/dashboard"}><Button size={"sm"} className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-500'>Anasayfa</Button></Link>
        :
        null
      }
        <div className={`${font.className} text-xl text-green-600`}>Gelir-Gider</div>
        <div className='absolute lg:right-10 right-1'>
          <Logout token={token} />
        </div>
    </div>
  )
}

export default Header