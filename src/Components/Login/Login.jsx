import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { authcontext } from './../../Context/AuthContext';
export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navgate = useNavigate()
   const {setUserToken} = useContext(authcontext)
  const loginFormik = useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    onSubmit: (values) => {
      setLoading(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
        .then((x) => {
          console.log(x.data.token)
          setUserToken(x.data.token)
          localStorage.setItem('token', x.data.token)
          setLoading(false)
          setSuccessMsg(true)
          setTimeout(() => {
            setSuccessMsg(false)
          }, 3000);
          navgate('/')
        })
        .catch((x) => {
          console.log(x)
          setLoading(false)
          setErrorMsg(x.response.data.message)
          setTimeout(() => {
            setErrorMsg("")
          }, 3000);
        })
      
     },
    validationSchema: yup.object().shape({
      email: yup.string().required("email isrequired").email("invalued email"),
      password: yup.string().required("put the password ").min(6, "minmum is 6").max(15, "maxmum is 15"),
    })
    
  })
  return (
    <div className='py-7 dark:text-white'>
      <form onSubmit={loginFormik.handleSubmit} className='max-w-2xl mx-auto'>
        {errorMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> 
          {errorMsg}
        </div> : ""}
        {successMsg ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  welcome
</div>: ""}
        <h2 className='text-2xl mb-3 font-medium'>Login now :</h2>
        
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email :</label>
          {loginFormik.errors.email && loginFormik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {loginFormik.errors.email} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password :</label>
          {loginFormik.errors.password && loginFormik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {loginFormik.errors.password} </div>:""}
        </div>
        <div className='flex justify-between items-center '>
          <Link to='/forgetPassword' className='text-blue-500  hover:text-blue-700 transition-all font-bold'>forget your password</Link>
          <button type="submit" class="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {!loading ? "Login" : <ThreeDots
  visible={true}
  height="30"
  width="30"
  color="#ffffff"
  radius="15"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> }
        </button>
        </div>
        
      </form>
    </div>
  )
}

