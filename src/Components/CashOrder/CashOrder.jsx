import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { authcontext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import * as yup from 'yup'

export default function CashOrder() {
    const { userToken } = useContext(authcontext)
    const { cartId, clearstates } = useContext(cartContext)
    const [loading, setLoading] = useState(false)
    const [iscash, setIsCash] = useState('cash')
    console.log(iscash)
    const navigate = useNavigate()
    function handleCashOrder(values) 
    {  
           setLoading(true)
            axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
                "shippingAddress": values,
            },
                {
                    headers: {
                        token: userToken
                    }
                }
            )
                .then(
                    () => {
                        toast.success('Order Done', {
                            icon: '🚀',
                            duration: 2000,
                            position: 'top-right'
                        })
                        clearstates()
                        setTimeout(() => {
                            navigate('/allorders')
                        }, 2000)
                        setLoading(false)
                    }
                )
                .catch(
                    () => {
                        toast.error('Order Failed', {
                            icon: '🚫',
                            duration: 2000,
                            position: 'top-right'
                        })
                        setLoading(false)
                    }
                )
        }
        function handleCheckOut(values) 
        {  
               setLoading(true)
                axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5181`, {
                    "shippingAddress": values,
                },
                    {
                        headers: {
                            token: userToken
                        }
                    }
                )
                    .then(
                        (res) => {
                            setLoading(false)
                            window.open(res.data.session.url,'_self')
                        }
                    )
                    .catch(
                        () => {  
                            setLoading(false)
                          }
                    )
            }
        const orderFormik = useFormik({
            initialValues: {
                details: "",
                phone: "",
                city: "",
            },
            onSubmit: iscash == 'cash' ? handleCashOrder : handleCheckOut,
            validationSchema: yup.object().shape({
                details:yup.string().required("your details are empty"),
                phone:yup.string().required("put your number").matches(/^01[0125][0-9]{8}$/,'put the egypt number'),
                city:yup.string().required("put your city")
            }),
        })
        return (
            <div className='py-7 dark:text-white'>
                <form onSubmit={orderFormik.handleSubmit} className='max-w-2xl mx-auto'>
                    <h2 className='text-2xl mb-3 font-medium'>Order now :</h2>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" value={orderFormik.values.details} onChange={orderFormik.handleChange} onBlur={orderFormik.handleBlur} id="details" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="details" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Details :</label>
                        {orderFormik.errors.details && orderFormik.touched.details ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {orderFormik.errors.details} </div>:""}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="tel" value={orderFormik.values.phone} onChange={orderFormik.handleChange} onBlur={orderFormik.handleBlur} id="phone" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone :</label>
                        {orderFormik.errors.phone && orderFormik.touched.phone ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {orderFormik.errors.phone} </div>:""}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" value={orderFormik.values.city} onChange={orderFormik.handleChange} id="city" onBlur={orderFormik.handleBlur} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">City :</label>
                        {orderFormik.errors.city && orderFormik.touched.city ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {orderFormik.errors.city} </div>:""}
                    </div>
                    <div className="flex items-center mb-4">
                        <input checked={iscash === "cash"} onClick={()=> setIsCash("cash")} id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pay By Cash</label>
                    </div>
                    <div className="flex items-center">
                        <input  checked={iscash === "visa"} 
        onClick={() => setIsCash("visa")}  id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pay By Card</label>
                    </div>

                    <button type="submit" className="text-white mt-2 ms-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {!loading ? "Order" : <ThreeDots
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

