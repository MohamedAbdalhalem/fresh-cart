import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { authcontext } from './AuthContext';


export const cartContext = createContext()
export default function CartContextProvider({children}) {
    const { userToken } = useContext(authcontext)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [products, setProducts] = useState(null)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState([])
    function clearstates() {
        setNumOfCartItems(0)
        setProducts(null)
        setTotalCartPrice(0)
    }
    async function addProductToCart(id) {
      const result =  await  axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            "productId": id,
        },
            {
            headers: {
                "token": userToken
            }
        })
            .then(res => {
            getCart()
                return true;
        })
        .catch(err => {
            console.log(err)
            return false;
        })
        return result;
    }
    function getCart() { 
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                "token": userToken
            }
        })
            .then(res => {
                setNumOfCartItems(res.data.numOfCartItems)
                setProducts(res.data.data.products)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setCartId(res.data.cartId)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (userToken) {
            getCart()
        }
    }, [userToken])
    function updatecount(id, count) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            "count": count
        }, {
            headers: {
                "token": userToken
            }
        })
            .then(res => {
                setNumOfCartItems(res.data.numOfCartItems)
                setProducts(res.data.data.products)
                setTotalCartPrice(res.data.data.totalCartPrice)
        })
        .catch(err => {
            console.log(err)
        })
    }
    async function removeProductFromCart(id) {
       await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                "token": userToken
            }
        })
            .then(res => {
                setNumOfCartItems(res.data.numOfCartItems)
                setProducts(res.data.data.products)
                setTotalCartPrice(res.data.data.totalCartPrice)
            })
            .catch(err => {
                console.log(err)
            })
    }
   async function clearCart() {
        await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: {
            token: userToken
          }
        }).then(res => {
            setNumOfCartItems(0)
        setProducts([])
        setTotalCartPrice(0)
        }).catch(err => {
          console.log(err)
        }
      )
      }
        return (
            <cartContext.Provider value={{
                addProductToCart,
                getCart,
                numOfCartItems,
                products,
                totalCartPrice,
                cartId,
                clearstates,
                updatecount,
                removeProductFromCart,
                clearCart
            }}>
                {children}
            </cartContext.Provider>
        )
    }

