import useAuthStore from "../stores/auth-store"
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const store = useAuthStore()
    const navigate = useNavigate(); // Get the navigate function

  return (
      <>
        <h1 className="mt-10">Login</h1>
      
        <form onSubmit={(e) => store.login(e, navigate)}  className=" border border-slate-400 flex flex-col gap-3 max-w-72 p-5">

            <input value={store.loginForm.email} onChange={(e) => store.updateLoginForm(e)} className="border border-slate-400" type="email" name="email" />

            <input value={store.loginForm.password} onChange={(e) => store.updateLoginForm(e)} className="border border-slate-400" type="password" name="password" />

            <button type="submit" className="p-1 bg-black text-white">Login</button>
        </form>
      </>
        
    
  )
}

export default LoginPage

