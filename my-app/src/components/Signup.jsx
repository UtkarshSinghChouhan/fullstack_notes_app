import useAuthStore from "../stores/auth-store"
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const store = useAuthStore()
    const navigate = useNavigate(); // Get the navigate function

  return (
      <>
        <h1 className="mt-10">Sign Up</h1>
      
        <form onSubmit={(e) => store.signup(e, navigate)}  className=" border border-slate-400 flex flex-col gap-3 max-w-72 p-5">

            <input 
                value={store.signUpForm.email} 
                onChange={(e) => store.updateSignUpForm(e)}            
                className="border border-slate-400" 
                type="email" 
                name="email" 
            />

            <input 
                value={store.signUpForm.password} 
                onChange={(e) => store.updateSignUpForm(e)}
                className="border border-slate-400" 
                type="password"
                name="password"
            />

            <button type="submit" className="p-1 bg-black text-white">SignUp</button>
        </form>
      </>
        
    
  )
}

export default Signup

