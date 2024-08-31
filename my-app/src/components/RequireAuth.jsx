import { useEffect } from "react"
import useAuthStore from "../stores/auth-store"

import {Navigate} from 'react-router-dom'


const RequireAuth = ({children}) => {

  const store = useAuthStore()

  useEffect(() => {
    if(store.loggedIn === null){
      store.checkAuth()
    }
  }, [])

  if(store.loggedIn === null ){
    return  <>Loading...</>
  }

  if(store.loggedIn === false){
    return  <Navigate to='/login' />
  }


  return (
    <div>{children ?? "Not Found"}</div>
  )
}

export default RequireAuth