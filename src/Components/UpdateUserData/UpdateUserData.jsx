import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { authcontext } from './../../Context/AuthContext';
import { ThreeDots } from 'react-loader-spinner';
export default function UpdateUserData() {
    const { userToken } = useContext(authcontext)
    const [successMsg, setSuccessMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    function updateUserData(values) {
        setLoading(true)
        axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe",
            values,
            {
                headers: {
                  token:userToken
              }
          }
        )
            .then(x => {
                setSuccessMsg(true)
                setLoading(false)
                setTimeout(() => {
                    setSuccessMsg(false)
                    navigate('/profile')
                }, 3000);
            })
            .catch(x => {
                setErrorMsg(x.response.data.errors.msg)
                setLoading(false)
                setTimeout(() => {
                   setErrorMsg('') 
                },3000)
        })
  }
  const updatUserFormik = useFormik({
    initialValues: {
        "name": "",
        "email": "",
        "phone": ""
    },
    onSubmit: updateUserData,
    validationSchema: yup.object().shape({
      name: yup.string().required("name is required").min(3, 'minmum must be 3').max(12, 'maxmum must be 12'),
        email: yup.string().required("email isrequired").email("invalued email"),
      phone:yup.string().required("put your num pleas").matches(/^01[0125][0-9]{8}$/,'put the egypt number')
    })
    
  })
  return (
    <div className='py-7 dark:text-white'>
      <form onSubmit={updatUserFormik.handleSubmit} className='max-w-2xl mx-auto'>
        {errorMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> 
          {errorMsg}
        </div> : ""}
        {successMsg ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  Your Data Upadted Successfly
</div>: ""}
              <h2 className='text-2xl mb-3 font-medium'>Update Your Data :</h2>
              <div class="relative z-0 w-full mb-5 group">
          <input type="text" value={updatUserFormik.values.name} onChange={updatUserFormik.handleChange} onBlur={updatUserFormik.handleBlur} id="name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name :</label>
          {updatUserFormik.errors.name && updatUserFormik.touched.name ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {updatUserFormik.errors.name} </div>:""}
        </div>      
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" value={updatUserFormik.values.email} onChange={updatUserFormik.handleChange} onBlur={updatUserFormik.handleBlur} id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email :</label>
          {updatUserFormik.errors.email && updatUserFormik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {updatUserFormik.errors.email} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="tel" value={updatUserFormik.values.phone} onChange={updatUserFormik.handleChange} onBlur={updatUserFormik.handleBlur} id="phone" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="phone" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone :</label>
          {updatUserFormik.errors.phone && updatUserFormik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {updatUserFormik.errors.phone} </div>:""}
        </div>
        <div className='flex justify-between items-center '>
          <button type="submit" class="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {!loading ? "Confirm" : <ThreeDots
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

