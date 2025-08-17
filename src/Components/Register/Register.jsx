import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navgate = useNavigate()
  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit: (values) => {
      setLoading(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        .then((x) => {
          console.log(x)
          setLoading(false)
          setSuccessMsg(true)
          setTimeout(() => {
            setSuccessMsg(false)
            navgate('/login')
          }, 3000);
          
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
      name: yup.string().required("name is required").min(3, 'minmum must be 3').max(12, 'maxmum must be 12'),
      email: yup.string().required("email isrequired").email("invalued email"),
      password: yup.string().required("put the password ").min(6, "minmum is 6").max(15, "maxmum is 15"),
      rePassword: yup.string().required("confirm the password").oneOf([yup.ref('password')], 'repassword'),
      phone:yup.string().required("put your num pleas").matches(/^01[0125][0-9]{8}$/,'put the egypt number')
    })
    
  })
  return (
    <div className='py-7  dark:text-white'>
      <form onSubmit={registerFormik.handleSubmit} className='max-w-2xl mx-auto'>
        {errorMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> 
          {errorMsg}
        </div> : ""}
        {successMsg ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  register confirm
</div>: ""}
        <h2 className='text-2xl mb-3 font-medium'>Register now :</h2>
        <div class="relative z-0 w-full mb-5 group">
          <input type="text" value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} id="name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
          <label htmlFor="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name :</label>
          {registerFormik.errors.name && registerFormik.touched.name ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {registerFormik.errors.name} </div>:""}
          
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email :</label>
          {registerFormik.errors.email && registerFormik.touched.email ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {registerFormik.errors.email} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password :</label>
          {registerFormik.errors.password && registerFormik.touched.password ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {registerFormik.errors.password} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="password" value={registerFormik.values.rePassword}  onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} id="rePassword" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="rePassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm password :</label>
          {registerFormik.errors.rePassword && registerFormik.touched.rePassword ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {registerFormik.errors.rePassword} </div>:""}
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input type="tel" value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} id="phone" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />    
          <label htmlFor="phone" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone :</label>
          {registerFormik.errors.phone && registerFormik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {registerFormik.errors.phone} </div>:""}
        </div>
        <button type="submit" class="text-white ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {!loading ? "Register" : <ThreeDots
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
