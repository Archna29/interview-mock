import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex p-4 item-center justify-between bg-black'>
        <Image src={'/logo.svg'} width={40} height={20} alt="logo"/>
        <ul className='flex gap-8 text-white'>
            <li>Dashboard</li>
            <li>Questions</li>
            <li>Upgrade</li>
            <li>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header