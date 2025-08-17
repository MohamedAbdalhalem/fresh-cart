import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { ThreeDots } from 'react-loader-spinner';
export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
     const [successMsg, setSuccessMsg] = useState('');
    const navgate = useNavigate()
    const forgetFormik = useFormik({
      initialValues: {
        email:""
      },
      onSubmit: (values) => {
        setLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
            .then((x) => {
                setSuccessMsg(x.data.message)
                console.log(x.data.message)
                setLoading(false)
                setTimeout(() => {
                    setSuccessMsg("")
                },2000)
              navgate('/verifyCode')  
          })
            .catch((x) => {
              setErrorMsg(x.response.data.message)
            console.log(x.response.data.message )
                setLoading(false)
                setTimeout(() => {
                    setErrorMsg("")
                },2000)
          })
        
       },
      validationSchema: yup.object().shape({
        email: yup.string().required("email isrequired").email("invalued email"),
      })
      
    })
    return (
      <div className='py-7 dark:text-white'>
        <form onSubmit={forgetFormik.handleSubmit} className='max-w-2xl mx-auto'>
          {errorMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> 
            {errorMsg}
          </div> : ""}
          {successMsg ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    {successMsg}
  </div>: ""}
          <h2 className='text-2xl mb-3 font-medium'>Enter your Email</h2>
          
          <div class="relative z-0 w-full mb-5 group">
            <input type="email" value={forgetFormik.values.email} onChange={forgetFormik.handleChange} onBlur={forgetFormik.handleBlur} id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
            <label htmlFor="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email :</label>
            {forgetFormik.errors.email && forgetFormik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {forgetFormik.errors.email} </div>:""}
          </div>
          
            <button type="submit" class="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!loading ? "verify" : <ThreeDots
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
