import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { authcontext } from './../../Context/AuthContext';
import { ThreeDots } from 'react-loader-spinner';
// import UpdatePassword from './UpdatePassword';
export default function UpdatePassword() {
    const { userToken } = useContext(authcontext)
    const [successMsg, setSuccessMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    function updatePassword(values) {
        setLoading(true)
        axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
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
  const updatePasswordFormik = useFormik({
    initialValues: {
      "currentPassword":"",
      "password":"",
      "rePassword":""
  },
    onSubmit: updatePassword,
    validationSchema: yup.object().shape({
      currentPassword: yup.string().required("put the old password ").min(6, "minmum is 6").max(15, "maxmum is 15"),
      password: yup.string().required("put the new password ").min(6, "minmum is 6").max(15, "maxmum is 15"),
      rePassword:yup.string().required("confirm the password").oneOf([yup.ref('password')], 'repassword')
    })
    
  })
  return (
    <div className='py-7 dark:text-white'>
      <form onSubmit={updatePasswordFormik.handleSubmit} className='max-w-2xl mx-auto'>
        {errorMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> 
          {errorMsg}
        </div> : ""}
        {successMsg ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  Your Password Upadted Successfly
</div>: ""}
              <h2 className='text-2xl mb-3 font-medium'>Update Your Password :</h2>
              <div class="relative z-0 w-full mb-5 group">
          <input type="text" value={updatePasswordFormik.values.currentPassword} onChange={updatePasswordFormik.handleChange} onBlur={updatePasswordFormik.handleBlur} id="oldpassword" name='currentPassword' class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="oldpassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Old Password :</label>
          {updatePasswordFormik.errors.currentPassword && updatePasswordFormik.touched.currentPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {updatePasswordFormik.errors.currentPassword} </div> : ""}
        </div>      
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" value={updatePasswordFormik.values.password} onChange={updatePasswordFormik.handleChange} onBlur={updatePasswordFormik.handleBlur} id="newpassword" name='password' class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="newpassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">New password :</label>
          {updatePasswordFormik.errors.password && updatePasswordFormik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {updatePasswordFormik.errors.password} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" value={updatePasswordFormik.values.rePassword} onChange={updatePasswordFormik.handleChange} onBlur={updatePasswordFormik.handleBlur} id="repassword" name='rePassword'  class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="repassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">rePassword :</label>
          {updatePasswordFormik.errors.rePassword && updatePasswordFormik.touched.rePassword ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {updatePasswordFormik.errors.rePassword} </div>:""}
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



