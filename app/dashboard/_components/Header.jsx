"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
console.log(path);
    },[])
  return (
    <div className='flex p-4 item-center justify-between bg-black '>
        <Image src={'/logo.svg'} width={40} height={20} alt="logo"/>

       
        <ul className=' flex gap-8  text-white  leading-10 cursor-pointer'>
            <li className={`hover:text-blue-500 font-bold transition-all
             ${path=='/dashboard' && 'text-blue-500 font-bold'}`}
            >Dashboard</li>
            <li className={`hover:text-blue-500 font-bold transition-all
             ${path=='/dashboard/questions' && 'text-blue-500 font-bold'}`}>Questions</li>
            <li className={`hover:text-blue-500 font-bold transition-all
             ${path=='/dashboard/upgrade' && 'text-blue-500 font-bold'}`}>Upgrade</li>
            <li className={`hover:text-blue-500 font-bold transition-all
             ${path=='/dashboard/howitworks' && 'text-blue-500 font-bold'}`}>How it works</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header