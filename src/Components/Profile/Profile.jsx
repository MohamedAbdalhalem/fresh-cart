import React, { useContext, useState } from 'react'
import img from '../../assets/images/WhatsApp Image 2025-02-08 at 16.57.58_b8c4604b.jpg'
import { authcontext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom';
export default function Profile() {
    const { userData } = useContext(authcontext);
    const [hidden,setHidden] = useState(false)
    console.log(userData);
    const {name,role} = userData
  return (
      <div className='py-7 dark:text-white max-w-2xl mx-auto'>
          <img src={img} className='w-[200px] max-w-[300px] max-h-[300px] h-[200px] mb-7 rounded-full block mx-auto' alt="" />
          
<dl class=" text-gray-900 divide-y border-b mb-5 border-gray-400 divide-gray-200 dark:text-white dark:divide-gray-700">
    <div class="flex flex-col pb-3 max-w-md">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                  <dd class="text-lg font-semibold">{ name}</dd>
    </div>
    <div class="flex flex-col py-3 max-w-md">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Role</dt>
                  <dd class="text-lg font-semibold">{ role }</dd>
    </div>
          </dl>
          <div>
<button onClick={()=> setHidden(!hidden)} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white w-full bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Setting <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

{hidden && <div id="dropdownHover" class="z-10 w-full bg-slate-200 divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
        <Link to='/updateUserData' class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update user data</Link>
      </li>
      <li>
        <Link to='/updatePassword' class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update password</Link>
      </li>
    </ul>
</div>}


          </div>
    </div>
  )
}
