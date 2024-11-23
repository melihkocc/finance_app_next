import Container from '@/components/Container'
import React from 'react'
import { Pacifico } from 'next/font/google'
import RegisterForm from '@/components/RegisterForm'

const font = Pacifico({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
  })
function Register() {
  return (
    <Container>
      <div className={`${font.className} text-green-600 text-center text-2xl`}>Kayıt Ol</div>
      <RegisterForm/>
    </Container>
  )
}

export default Register