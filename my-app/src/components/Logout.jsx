import { useEffect } from "react"
import useAuthStore from "../stores/auth-store"

const Logout = () => {
    const logout = useAuthStore(state => state.logout)

    useEffect(() => {
        logout()
    },[])

  return (
    <h1>You are now logged out</h1>
  )
}

export default Logout