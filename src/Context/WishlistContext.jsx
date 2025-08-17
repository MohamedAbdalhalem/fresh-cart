import React, { createContext, useContext, useEffect, useState } from 'react'
import { authcontext } from './AuthContext'
import axios from 'axios'
export const WishlistContext = createContext()
export default function WishlistContextProvider({ children }) {
    const { userToken } = useContext(authcontext)
    
    const [products,setProducts] = useState(null)
    async function addToWishList(id) {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            "productId": id
        },
            {
                headers: {
                token:userToken
            }
            })
            .then(() => {
                getWishlist()
            return true
            })
            .catch(() => {
            return false
            })
        return res
    }
    function getWishlist() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token:userToken
            }
        }).then((res) => {
            setProducts(res.data.data)
        })
    }
    useEffect(() => {
        getWishlist()
    }, [userToken])
    async function deleteFromWishlist(id) {
       const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token:userToken
            }
        })
            .then(() => {
                getWishlist()
                return true;
            })
            .catch(() => {
                return false;
            })
        return res;
    }
  return (
      <WishlistContext.Provider value={{
          addToWishList,
          products,
          deleteFromWishlist
      }
    }>
      {children}
    </WishlistContext.Provider>
  )
}
