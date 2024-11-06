'use client'
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProv'
import { TotalUsageContext } from '../(context)/TotalUsageContext'

const inter= Inter({subsets:['latin']})

function layout({children,}:Readonly<{children:React.ReactNode}>) {

  const [total,setTotal]=useState<Number>(0)
  const [hidden, setHidden] = useState(true)
  
  return (
    <TotalUsageContext.Provider value={{total,setTotal}}>
    <div className='bg-slate-100 min-h-screen dark:bg-[#080d2b]'>
        <div className={`md:w-64 w-screen z-[11] fixed bg-white ${hidden ? "hidden" : ""} md:flex md:flex-col`}>
        {/* <div className='md:w-64 hidden md:block fixed bg-white'> */}
            <SideNav setHidden={setHidden} hidden={hidden} />
        </div>
        <div className='md:ml-64'>
          <Header setHidden={setHidden} hidden={hidden} />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            </ThemeProvider>
        </div>
    </div>
    </TotalUsageContext.Provider>
  )
}

export default layout