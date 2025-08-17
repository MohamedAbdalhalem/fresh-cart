import React from 'react';
import LoudingScreen from '../LoudingScreen/LoudingScreen';
import usecategories from './../../Custom Hooks/usecategories';
import { Link } from 'react-router-dom';

export default function Categories() {
  const { data, isLoading } = usecategories()
  if (isLoading) {
    return <LoudingScreen />
  }
  return (
    <div className='container mx-auto p-5'>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data?.data.data.map(category => <Link to={`/categories/${category._id}`}  key={category._id} className='group border p-3 rounded-md shadow-md cursor-pointer dark:border-gray-700 dark:bg-gray-800'>
          <img src={category.image} className='w-full rounded-md h-32' alt="" />
          <h2 className='text-center text-gray-700 dark:text-white group-hover:text-blue-700  transition-all font-bold text-2xl'>{ category.name}</h2>
        </Link> )} 
      </div>
    </div>
  )
}
