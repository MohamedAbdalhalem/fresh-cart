import React, { useContext, useEffect, useState } from 'react'
import img from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authcontext } from '../../Context/AuthContext'
import { cartContext } from '../../Context/CartContextProvider'


export default function Navbar() {
  const { userToken, setUserToken } = useContext(authcontext)
  const {numOfCartItems} = useContext(cartContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUserToken(null)
    navigate('/login')
  }
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    
<nav className="bg-white border-gray-200 shadow dark:bg-gray-900 dark:shadow-sm-light">
  <div className=" px-5 container mx-auto flex flex-wrap gap-4 md:flex-nowrap items-center justify-between py-4">
    <Link  className="flex items-center space-x-3 rtl:space-x-reverse" to=''>
        <img src={img} className="h-8" alt="Flowbite Logo" />
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400fault" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
        <div className="hidden w-full md:flex justify-between  me-auto" id="navbar-default">
          {userToken ? <ul className="font-medium flex  flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink className="block py-2 px-3 rounded  md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " aria-current="page" to='/'>Home</NavLink>
        </li>
        
        <li>
          <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/categories'>Categories</NavLink>
            </li>
            <li>
          <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/brands'>Brands</NavLink>
            </li>
            <li>
          <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/wishlist'>Wishlist</NavLink>
            </li>
            <li>
          <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/allorders'>Orders</NavLink>
        </li>
          </ul> : ""}
      
          <ul className="font-medium ms-auto items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li className='cursor-pointer' onClick={() => setDarkMode(!darkMode)}>
              <i class={`fa-solid ${darkMode ? "fa-moon text-white" : "fa-sun"}`}></i>
              </li>
            {userToken ? <>
              <li>
              <NavLink to='/cart' className='relative dark:text-white'>
                <i className='fa-solid fa-cart-arrow-down'></i>
                <p className=' absolute top-0 right-[-2px] translate-x-full -translate-y-[50%]'>{ numOfCartItems ? numOfCartItems : "" }</p>
              </NavLink>
              </li>
              
              <li>
                <NavLink to='/profile' className='dark:text-white'>
                <i class="fa-solid fa-circle-user text-lg"></i>
                </NavLink>
              </li>
            </> : ""}
            {userToken ?            <li>
          <span onClick={handleLogout} className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/login'>Logout</span>
            </li> : <><li>
          <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/register'>Register</NavLink>
            </li>
            
            <li>
          <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white " to='/login'>Login</NavLink>
            </li></>}
        

            
      </ul>
    </div>
  </div>
</nav>

  )
}
