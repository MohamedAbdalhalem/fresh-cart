import React, { useContext } from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { authcontext } from '../../Context/AuthContext';

export default function Layout() {
  const {userToken} = useContext(authcontext)
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer/>
      </>
  )
}
