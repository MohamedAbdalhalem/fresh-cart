import axios from 'axios'
import  { useContext } from 'react'
import LoudingScreen from '../LoudingScreen/LoudingScreen'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { cartContext } from './../../Context/CartContextProvider';
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'

export default function Home() {
  const { addProductToCart } = useContext(cartContext)
  const { addToWishList,products,deleteFromWishlist } = useContext(WishlistContext)
  console.log(products);
  
  function getallProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getallProducts,
  })
  if (isLoading) {
    return <LoudingScreen />
  }
  if (isError) {
    return <h1 className='p-10 text-center text-5xl font-bold'>Data Not Found</h1>
  }
  async function handleAddToCart(id) {  
    const res = await addProductToCart(id)
    if (res) {
      toast.success('Product Added To Cart', { icon: '👍', duration: 2000, position: 'top-right', style: { color: "blue", fontWeight: "bold" } })
    } else {
      toast.error('Product Not Added To Cart', { icon: '👎', duration: 2000, position: 'top-right', style: { color: "red", fontWeight: "bold" } })
    }
  }
  async function handleAddToWishlist(id) {  
    const res = await addToWishList(id)
    if (res) {
      toast.success('Product Added To Wishlist', { icon: '👍', duration: 2000, position: 'top-right', style: { color: "blue", fontWeight: "bold" } })
    } else {
      toast.error('Product Not Added To Wishlist', { icon: '👎', duration: 2000, position: 'top-right', style: { color: "red", fontWeight: "bold" } })
    }
  }
  async function handleDeleteToWishlist(id) {
    const res = await deleteFromWishlist(id)
    if (res) {
      toast.success('Product removed To Cart', { icon: '👍', duration: 2000, position: 'top-right', style: { color: "blue", fontWeight: "bold" } })
    } else {
      toast.error('Product Not removed To Cart', { icon: '👎', duration: 2000, position: 'top-right', style: { color: "red", fontWeight: "bold" } })
    }
  }
    return (
      <div className='container mx-auto p-5' >
        <HomeSlider />
        <CategoriesSlider />
        <div className=" grid md:grid-cols-3  xl:grid-cols-6 gap-4">
          {data?.data.data.map(product => <Link to={`/productdatiales/${product._id}`} key={product._id}
            className="overflow-hidden group cursor-pointer relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a>
              <img className="rounded-t-lg w-full" src={product.imageCover} alt="" />
            </a>
            <div className="p-5">
              <a>
                <h5 className="mb-2  font-medium tracking-tight text-blue-700 dark:text-white">{product.title.split(' ').slice(0,2).join(' ')}</h5>
              </a>
              <Link to={`/categories/${product.category._id}`} className="mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400 dark:hover:text-blue-500 hover:text-blue-400 transition-all">
                {product.category.name}
              </Link>
              {/* (e) => {
                e.preventDefault(),
                handleAddToWishlist(product._id)
              } */}
              <div className="flex  justify-between">
                <div className='flex items-center'>
                  {product.priceAfterDiscount ? <>
                    <p className='text-red-700 line-through me-1'>{product.price}</p>
                    <p className='dark:text-white'>{product.priceAfterDiscount + "EGP"}</p>
                  </> : <p className='dark:text-white'>{product.price + "EGP"}</p>}
                </div>
                <p><i className='fa-solid fa-star text-yellow-300'></i><span className=' text-gray-500'>{product.ratingsAverage}</span></p>
              </div>
              <button onClick={(e) => {
                e.preventDefault()
                handleAddToCart(product._id)
              }} className='bg-blue-700 w-10 h-10 rounded-lg top-0 translate-x-[100%] text-white right-0 absolute group-hover:translate-x-0 transition-all'><i className='fa-solid fa-plus'></i></button>
              <button onClick={!products?.some(heart => heart._id === product._id)? (e) => {
                e.preventDefault(),
                handleAddToWishlist(product._id)
              }:(e) => {
                e.preventDefault(),
                handleDeleteToWishlist(product._id)
              }} className='bg-blue-700 w-10 h-10 rounded-lg top-0 -translate-x-[100%] text-white left-0 absolute group-hover:-translate-x-0 transition-all'>{ products?.some(heart => heart._id === product._id) ? 
                <i className="fa-solid fa-heart text-red-700"></i> : 
                <i className="fa-solid fa-heart text-white"></i> }
              </button>
            </div>
          </Link>)}
        </div>
        
      
      </div>
    )
  }

