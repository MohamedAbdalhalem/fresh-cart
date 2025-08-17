import React, { useContext } from 'react'
import { authcontext } from '../../Context/AuthContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import LoudingScreen from '../LoudingScreen/LoudingScreen'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'

export default function Orders() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    const { userData } = useContext(authcontext)
    const {id} = userData
    function getAllOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }
    const {data,isLoading,isError} = useQuery({
        queryKey: 'allOrders',
        queryFn: getAllOrders
    })
  console.log(data?.data
  )
  if (isLoading) {
    return <LoudingScreen/>
  }
  if (isError) {
    return <h1 className='h-[500px] flex justify-center items-center text-5xl font-bold'>No Data Found</h1>
  }
  return (
    <div className=' container mx-auto p-5'>
      {data?.data.map(order => <div className="grid grid-cols-1   mb-4 md:grid-cols-4 items-center bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 dark:bg-gray-800 ">
        <div className="col-span-1 flex justify-center items-center rounded-lg">
          <div className='text-2xl dark:text-white'>
            <h2 className='mb-1'>Name: {order.user.name}</h2>
            <p className='mb-1'>phone: {order.user.phone}</p>
            <p className='mb-1'>city: {order.shippingAddress.city}</p>
            <p className='mb-1'>region: {order.shippingAddress.details}</p>
            <p className='mb-1'>order_price: { order.totalOrderPrice }</p>
          </div>
        </div>
        <div className="orders col-span-1 md:col-span-3 p-4 ">
          <Slider {...settings} >
            {/* to={`/productdatiales/${product.product._id}`} */}
            {order.cartItems.map(product => 
              <Link    key={product.product._id}
            className=" overflow-hidden  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a>
              <img className="rounded-t-lg w-full " src={product.product.imageCover} alt="" />
            </a>
            <div className="p-5">
              <a>
                    <h5 className="mb-2  font-medium tracking-tight text-blue-700 dark:text-white">
                    {product.product.title.split(' ').slice(0,2).join(" ")}
                </h5>
                </a>
                
              <p className="mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400 hover:text-blue-400 transition-all">
                {product.product.category.name}
                  </p>
                  <p className='mb-3 font-bold text-xl dark:text-white'>Count : { product.count }</p>
              <div className="flex  justify-between">
                <div className='flex items-center'>
                  {product.priceAfterDiscount ? <>
                    <p className='text-red-600 line-through me-1'>{product.price}</p>
                    <p className='dark:text-white'>{product.priceAfterDiscount + "EGP"}</p>
                  </> : <p className='dark:text-white'>{product.price + "EGP"}</p>}
                </div>
                  {/* <p>{product.price + "EGP"}</p> */}
                <p><i className='fa-solid fa-star text-yellow-300'></i><span className=' text-gray-500'>{product.product.ratingsAverage}</span></p>
              </div>
            </div>
          </Link>
            )}
          </Slider>
        </div>
                  
      </div>)}
    </div>
  )
}
// {product.title.split(' ').slice(0,2).join(' ')}