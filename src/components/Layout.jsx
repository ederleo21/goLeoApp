import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

export const Layout = () => {

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <main className='flex-grow mt-[70px]'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
