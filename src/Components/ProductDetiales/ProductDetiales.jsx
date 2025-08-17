import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoudingScreen from '../LoudingScreen/LoudingScreen'
import Slider from 'react-slick'
import { cartContext } from './../../Context/CartContextProvider';
import  toast  from 'react-hot-toast';
export default function ProductDetiales() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const { id } = useParams()
    const { addProductToCart }  = useContext(cartContext)
    async function handleAddProductToCart() { 
        const result = await addProductToCart(id)
        console.log(result)
        if (result) {
            toast.success('Product Added To Cart', {
                icon: '👍',
                duration: 2000,
                position: 'top-right',
                style: {color:"blue",fontWeight:"bold"}
            })
        } else {
            toast.error('Product Not Added To Cart', {
                icon: '👎',
                duration: 2000,
                position: 'top-right',
                style: {color:"red",fontWeight:"bold"}
            })
        }
    }
    function productdetiales() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isLoading, isError } = useQuery({
        queryKey: ['productdetiales' , id],
        queryFn: productdetiales,
    })
    const detiales = data?.data.data
    console.log(detiales)
    if (isLoading) {
        return <LoudingScreen />
    }
    if (isError) {
        return <h1 className='p-10 text-center text-5xl font-bold'>Data Not Found</h1>
    }
  return (
<div className="container mx-auto p-5">
    <div  className="grid grid-cols-1 md:grid-cols-4 items-center bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 dark:bg-gray-800">
    <div className="h-full productDetiales col-span-1 rounded-lg">
        <Slider className='mb-[-6px] ' {...settings}>
          <div>
          <img className=" w-full  md:rounded-none md:rounded-s-lg" src={detiales.
images[0]} alt="" />
          </div>
          <div>
          <img className="w-full rounded-t-lg md:rounded-none md:rounded-s-lg" src={detiales.
images[1]} alt="" />
          </div>
          <div>
          <img className=" w-full rounded-t-lg md:rounded-none md:rounded-s-lg" src={detiales.
images[2]} alt="" />
          </div>
          <div>
          <img className="w-full rounded-t-lg  md:rounded-none md:rounded-s-lg" src={detiales.
images[3]} alt="" />
          </div>
        </Slider>
    </div>
        <div className=" col-span-1 md:col-span-3 p-4 leading-normal">
                  <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ detiales.title.split(' ').slice(0,5).join(' ')}</h4>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ detiales.description
                  }</p>
                  <Link to={`/categories/${detiales.category._id}`}   className='block text-blue-700 font-bold'><span className='text-black  dark:text-white'>Category:</span> { detiales.category
                      .name}</Link>
                  <Link to={`/brands/${detiales.brand._id}`}   className='font-bold block text-blue-700 mt-2'><span className='text-black dark:text-white'>Brand:</span> {detiales.brand.name}</Link>
                  <p className='font-bold dark:text-white mt-2'>+ {detiales.sold} bought in past mounth</p>
                  <div className='flex justify-between items-center my-2'>
                  <div className='flex items-center'>
                {detiales.priceAfterDiscount ? <>
                  <p className='text-red-700 line-through me-1'>{detiales.price}</p>
                  <p className='dark:text-white'>{ detiales.priceAfterDiscount + "EGP" }</p>
                </> : <p className='dark:text-white'>{detiales.price + "EGP"}</p>}
                      </div>
                      <p className='text-gray-700 dark:text-gray-400'><i className='fa-solid fa-star text-yellow-300'></i>{detiales.ratingsAverage
                      }</p>
                  </div>
            <button onClick={handleAddProductToCart} className='bg-blue-700 py-2 w-full rounded-md text-white  hover:bg-blue-500'>+ Add To Cart</button>    
    
                  
              </div>
                  
        </div>
    </div>
    
                    )
  
}
