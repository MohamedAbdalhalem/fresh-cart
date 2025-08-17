import React from 'react'

export default function Footer() {
  return (
    <div className='shadow-up-dark dark:shadow-up-light dark:text-white '>
      <div className='container p-5 mx-auto'>
      <p className='text-3xl'>Get the FreshCart app</p>
      <p className='text-gray-500 mt-2 text-xl'>We will send you a link, open  it on your phone to downloud the app</p>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 border-b border-gray-300 pb-7'>
        <input type="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:col-span-3' placeholder='Email...' />
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 h-full me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Share App Link</button>
      </div>
      <div className='mt-7 flex justify-center gap-5 flex-wrap text-2xl dark:text-white text-gray-900'>
        <i className='fa-brands fa-facebook-f hover:text-blue-700 transition-all cursor-pointer'></i>
        <i className='fa-brands fa-twitter hover:text-blue-700 transition-all cursor-pointer'></i>
        <i className='fa-brands fa-linkedin hover:text-blue-700 transition-all cursor-pointer'></i>
        <i className='fa-brands fa-behance hover:text-blue-700 transition-all cursor-pointer'></i>
      </div>
      </div>
    </div>



  )
}
