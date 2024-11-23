import React from 'react'

function Container({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='mt-10 w-full'>
        {children}
    </div>
  )
}

export default Container