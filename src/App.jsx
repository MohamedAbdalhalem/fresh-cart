import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import AuthContextProvider from './Context/AuthContext';
import ProtectedUnAuth from './Components/ProtectedUnAuth/ProtectedUnAuth';
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Categories from './Components/Categories/Categories';
import ProductDetiales from './Components/ProductDetiales/ProductDetiales';
import CartContextProvider from './Context/CartContextProvider';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import BrandsProducts from './Components/Brands Products/BrandsProducts';
import CategoriessProducts from './Components/Categoriess Products/CategoriessProducts';
import CashOrder from './Components/CashOrder/CashOrder';
import Wishlist from './Components/Wishlist/Wishlist';
import WishlistContextProvider from './Context/WishlistContext';
import Orders from './Components/Orders/Orders';
import { Offline } from 'react-detect-offline';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Profile from './Components/Profile/Profile';
import UpdateUserData from './Components/UpdateUserData/UpdateUserData';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
const router = createBrowserRouter([
    {
        path: '', element: <Layout />, children: [
            { index: true, element: <ProtectedUnAuth ><Home /></ProtectedUnAuth> },
            { path: 'home', element: <ProtectedUnAuth> <Home /></ProtectedUnAuth> },
            {path:'productdatiales/:id',element:<ProtectedUnAuth><ProductDetiales/></ProtectedUnAuth>},
            { path: 'categories', element: <ProtectedUnAuth><Categories /></ProtectedUnAuth> },
            { path: 'categories/:id', element: <ProtectedUnAuth><CategoriessProducts /></ProtectedUnAuth> },
            { path: 'brands', element: <ProtectedUnAuth><Brands /></ProtectedUnAuth> },
            { path: 'brands/:id', element: <ProtectedUnAuth><BrandsProducts /></ProtectedUnAuth> },
            { path: 'cart', element: <protectedUnAuth><Cart /></protectedUnAuth> },
            { path: 'cashorder', element: <ProtectedUnAuth><CashOrder /></ProtectedUnAuth> },
            { path: 'wishlist', element: <ProtectedUnAuth><Wishlist /></ProtectedUnAuth> },
            { path: 'allorders', element: <protectedUnAuth><Orders /></protectedUnAuth> },
            { path: 'profile', element: <protectedUnAuth><Profile /></protectedUnAuth> },
            { path: 'updateUserData', element: <protectedUnAuth><UpdateUserData /></protectedUnAuth> },
            {path:'updatePassword',element:<protectedUnAuth><UpdatePassword/></protectedUnAuth>},
            { path: 'register', element: <ProtectedAuth> <Register /> </ProtectedAuth> },
            { path: 'login', element: <ProtectedAuth> <Login /></ProtectedAuth> },
            { path: 'forgetPassword', element: <protectedAuth><ForgetPassword /></protectedAuth> },
            {path:'resetPassword',element:<protectedAuth><ResetPassword/></protectedAuth>},
            {path:'verifyCode',element:<protectedAuth><VerifyCode/></protectedAuth>},
            { path: '*', element: <NotFound /> }
    ]}
])
const client = new QueryClient()
export default function App() {
  return (
      <>
        <QueryClientProvider client={client}>
              <AuthContextProvider>
                  <CartContextProvider>
                      <WishlistContextProvider>
                          <RouterProvider router={router} />
                          </WishlistContextProvider>
                      </CartContextProvider>
              </AuthContextProvider>
          </QueryClientProvider>
          <Toaster />
          <Offline>
              <div className='bg-black opacity-50 fixed bottom-1/2 right-0 left-0 py-6 text-center text-white text-3xl'>
                  <h1>Your Network Is Unstable</h1>
              </div>
          </Offline>
      </>
  )
}
