import Container from '@/components/Container'
import React from 'react'
import { Pacifico } from 'next/font/google'
import LoginForm from '@/components/LoginForm'
import { Suspense } from 'react'

const font = Pacifico({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
  })
function Login() {
  return (
    <Container>
      <div className={`${font.className} text-green-600 text-center text-2xl`}>Giriş Yap</div>
      <Suspense>
        <LoginForm/>
      </Suspense>
    </Container>
  )
}

export default Login
