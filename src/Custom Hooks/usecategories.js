import { useQuery } from '@tanstack/react-query'
import { getallcategories } from '../Utilites/Utilites'

export default function usecategories() {
      const result = useQuery({
        queryKey: ['allCategories'],
        queryFn: getallcategories,
      })
    return result   
    
}