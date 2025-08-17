import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useState } from "react"

export  const authcontext = createContext()
export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null)
  const [userData, setUserData] = useState("")
  function decodeToken() {
    const res = jwtDecode(userToken)
    setUserData(res)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      setUserToken(token)
    }
  }, [])
  useEffect(() => {
    if (userToken) {
      decodeToken()
    }
  },[userToken])
  return (
      <authcontext.Provider value={{
      setUserToken,
      userToken,
      userData
    }}>
     {children} 
    </authcontext.Provider>
  )
}
