import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContextProvider"
import LoudingScreen from "../LoudingScreen/LoudingScreen"
import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"



export default function Cart() {
  const { products, totalCartPrice,numOfCartItems, updatecount, removeProductFromCart, clearCart } = useContext(cartContext)
  const [louding1, setlouding1] = useState(false)
  const [louding2, setlouding2] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [id,setId] = useState('')
  if (!products) {
    return <LoudingScreen />
  }
  function handleUpdateCount(id, count) {
    updatecount(id, count)
  }
  async function handelClearCart() {
    setlouding1(true)
    await clearCart()
    setlouding1(false)
  }
  function handleopen(id) {
    setIsOpen(true)
    setId(id)
  }
  async function handleDeleteItem() {
    setlouding2(true)
    await removeProductFromCart(id)
    setlouding2(false)
    setIsOpen(false)
  }
  return (
    <div className="container mx-auto p-5 dark:text-white">
      
      <div className="flex justify-between items-center">
        <div>
        <h2 className="text-2xl">TotalPrice : {totalCartPrice}</h2>
        </div>
        {numOfCartItems ? <button onClick={handelClearCart} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          {!louding1 ? 'Clear Cart' : <ThreeDots
    visible={true}
    height="30"
    width="30"
    color="#ffffff"
    radius="15"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />}
        </button>:''}
          </div>
<div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
                      {products.map(product => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=> handleUpdateCount(product.product._id,product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focu s:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" value={product.count
} id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
            </div>
            <button onClick={()=> handleUpdateCount(product.product._id,product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}
        </td>
        <td className="px-6 py-4">
                          <button onClick={() => handleopen(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                          {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-md w-full max-w-md">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900"
            >
              ✖
            </button>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-medium text-gray-700">
                Are you sure you want to delete this product?
              </h3>
              <button
                onClick={() => handleDeleteItem(product.product.id)}
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {!louding2 ? 'Yes Iam Sure' : <ThreeDots
    visible={true}
    height="30"
    width="30"
    color="#ffffff"
    radius="15"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
    )
    }
        </td>
      </tr>)} 
    </tbody>
        </table>
        
      </div>
      {numOfCartItems ? <Link to='/cashorder'>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full mt-3">Order Now</button></Link> : <h2 className=" text-center mt-3 text-xl font-bold">Your Cart Is Empty</h2>}
      
    </div>
  )
}
