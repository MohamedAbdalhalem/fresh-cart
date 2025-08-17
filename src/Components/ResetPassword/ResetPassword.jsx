import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navgate = useNavigate()
  const resetPasswordFormik = useFormik({
    initialValues: {
      email:"",
      newPassword:"",
    },
    onSubmit: (values) => {
      setLoading(true)
      axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
        .then((x) => {
          console.log(x)
          setLoading(false)
          navgate('/login')
        })
        .catch((x) => {
          setLoading(false)
          setErrorMsg("Your email is Wrong")
          setTimeout(() => {
            setErrorMsg("")
          }, 3000);
        })
      
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("email isrequired").email("invalued email"),
      newPassword: yup.string().required("put the password ").min(6, "minmum is 6").max(15, "maxmum is 15"),
    })
    
  })
  return (
    <div className='py-7 dark:text-white'>
      <form onSubmit={resetPasswordFormik.handleSubmit} className='max-w-2xl mx-auto'>
        {errorMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> 
          {errorMsg}
        </div> : ""}
        <h2 className='text-2xl mb-3 font-medium'>Reset Your Password :</h2>
        
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" value={resetPasswordFormik.values.email} onChange={resetPasswordFormik.handleChange} onBlur={resetPasswordFormik.handleBlur} id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email :</label>
          {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {resetPasswordFormik.errors.email} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" value={resetPasswordFormik.values.newPassword} onChange={resetPasswordFormik.handleChange} onBlur={resetPasswordFormik.handleBlur} id="newPassword" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="newPassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password :</label>
          {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {resetPasswordFormik.errors.newPassword} </div>:""}
        </div>
        
          <button type="submit" class="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {!loading ? "Reset Your Password" : <ThreeDots
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
       
        
      </form>
    </div>
  )
}



