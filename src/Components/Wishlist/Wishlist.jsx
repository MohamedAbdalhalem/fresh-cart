import React, { useContext } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import LoudingScreen from '../LoudingScreen/LoudingScreen'
import { cartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

export default function Wishlist() {
    const { products,deleteFromWishlist } = useContext(WishlistContext)
    console.log(products)
    const { addProductToCart } = useContext(cartContext)
    if (!products) {
        return <LoudingScreen/>
    }
    async function handleAddToCart(id) {  
        const res = await addProductToCart(id)
        if (res) {
          toast.success('Product Added To Cart', { icon: '👍', duration: 2000, position: 'top-right', style: { color: "blue", fontWeight: "bold" } })
        } else {
          toast.error('Product Not Added To Cart', { icon: '👎', duration: 2000, position: 'top-right', style: { color: "red", fontWeight: "bold" } })
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
    <div className=' container mx-auto p-5'>
          <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
              {products.map(product => <Link to={`/productdatiales/${product._id}`} key={product._id}
            className="overflow-hidden group cursor-pointer relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a>
              <img className="rounded-t-lg w-full" src={product.imageCover} alt="" />
            </a>
            <div className="p-5">
              <a>
                <h5 className="mb-2  font-medium tracking-tight text-blue-700 dark:text-white">{product.title.split(' ').slice(0, 3).join(' ')}</h5>
              </a>
              <p className="mb-3 font-bold text-2xl text-gray-700 dark:text-gray-400">
                {product.category.name}
              </p>
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
                      <button onClick={(e) => {
                          e.preventDefault(),
                              handleDeleteToWishlist(product._id)
              }} className='bg-blue-700 w-10 h-10 rounded-lg top-0 text-white left-0 absolute transition-all group-remove group/remove'><i className='fa-solid fa-heart text-red-700 group-hover/remove:text-white transition-all'></i></button>
            </div>
          </Link>)}
      </div>
    </div>
  )
}
