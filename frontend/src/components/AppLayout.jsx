import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <>
    <Navbar/>

    <Outlet/>

    <Foter/>
    </>
  )
}

export default AppLayout