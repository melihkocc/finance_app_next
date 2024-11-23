import React from 'react'
import { Pacifico } from 'next/font/google'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import Link from 'next/link';

const font = Pacifico({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
  })

function Footer() {


  return (
    <div className='w-full grid lg:grid-cols-3 grid-cols-1 px-20 border-t shadow-lg py-5 mt-10'>
        <div className='text-center text-xl'>Melih Koç</div>
        <div className={`${font.className} text-xl text-green-600 text-center lg:block hidden`}>Gelir-Gider</div>
        <div className='flex justify-center items-center lg:mt-0 mt-5'>
            <Link target='_blank' href={"https://github.com/melihkocc"}><FaGithub size={30}/></Link>
            <Link target='_blank' href={"https://www.linkedin.com/in/melih-koc-1b1a5a237/"}><FaLinkedin className='ms-5' size={30}/></Link>
            <Link target='_blank' href={"https://my-portfolio-eta-ashy.vercel.app/"}><IoIosContact className='ms-5' size={35}/></Link>
        </div>
    </div>
  )
}

export default Footer