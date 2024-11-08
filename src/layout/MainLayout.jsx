import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />  
        {/* // The Outlet component is a placeholder for the child routes of the current route. */}
    </>
  )
}

export default MainLayout
