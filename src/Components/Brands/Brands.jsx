import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import LoudingScreen from './../LoudingScreen/LoudingScreen';
import { Link } from "react-router-dom";



export default function Brands() {
    function getBrands() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }
    const {data,isLoading} = useQuery({
        queryKey: 'brands',
        queryFn: getBrands,
    })
    if (isLoading) {
        return <LoudingScreen />
    }
  return (
    <div className="container mx-auto p-5">
          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.data.data.map(brand => <Link to={`/brands/${brand._id}`} key={brand._id} className="group cursor-pointer rounded-lg shadow-md p-2 border dark:border-gray-700 dark:bg-gray-800">
                  <img src={brand.image} className="rounded-lg w-full" alt={brand.name} />
                  <p className="group-hover:text-blue-700 text-black transition-all font-bold text-center text-lg dark:text-white">{ brand.name }</p>
              </Link>)}
      </div>
    </div>
  )
}
