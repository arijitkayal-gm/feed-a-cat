"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { Button } from './Button'

const Navbar = () => {

  const { data: session } = useSession()

  const [showDropdown, setShowDropdown] = useState(false)


  return (
    <nav className='bg-black text-white flex flex-col md:flex-row justify-between items-center text-xl px-4 md:h-16'>
      <Link className="logo font-bold text-lg flex justify-center items-center " href={"/"}>
        <span className='text-xl md:text-3xl  my-3 md:my-0'>Feed a Cat</span>
        <img className='w-[25] md:w-[35]' src="logo.gif"  alt="Logo" loading="lazy" />
      </Link>
      <div className='flex gap-2 items-center justify-between'>
        {session &&
          <div className='relative'>
            <button onClick={() => { setShowDropdown(!showDropdown) }} onBlur={() => {
              setTimeout(() => {
                setShowDropdown(false)
              }, 500);
            }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className={`${Button} flex`} type="button">{session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>


            <div id="dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Page</Link>
                </li>
                <li>
                  <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>
          </div>}

        {session &&
          <button type="button" className={Button} onClick={() => signOut()}>Logout</button>
        }

        {!session && <Link href={"/login"}>
          <button className={Button}>Login</button>
        </Link>}

      </div>
    </nav>
  )
}

export default Navbar