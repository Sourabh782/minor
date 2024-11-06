'use client'
import React, { useState } from 'react'
import SideNav from '../dashboard/_components/SideNav'
import { ThemeProvider } from '@/components/ThemeProv'
import { TotalUsageContext } from '../(context)/TotalUsageContext'
import Header from '../dashboard/_components/Header'


function layout({children,}:Readonly<{children:React.ReactNode}>) {

  const [total,setTotal]=useState<Number>(0)
  const [hidden, setHidden] = useState(true)
  return (
    <TotalUsageContext.Provider value={{total,setTotal}}>
    <div className='bg-white h-screen dark:bg-[#080d2b]' suppressHydrationWarning={true}>
        <div className={`md:w-64 w-full z-[11] md:block fixed bg-white ${hidden ? "hidden" : ""} md:flex md:flex-col`}>
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