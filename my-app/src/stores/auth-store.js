import { create } from "zustand";

const useAuthStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signUpForm: {
    email: "",
    password: "",
  },

  updateSignUpForm: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        [name]: value,
      },
    }));
  },

  signup: async (e, navigate) => {
    e.preventDefault();
    
    
    const { signUpForm } = useAuthStore.getState();
    console.log(signUpForm);

    const res = await fetch(`http://localhost:3000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(signUpForm),
      credentials: "include", // Allow sending cookies with the request
    });

    set({
      signUpForm : {
        email : '',
        password: ''
      }
    })

    navigate('/login');
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value,
      },
    }));
  },
  
  login: async (e, navigate) => {
    e.preventDefault();
    try{
      const { loginForm } = useAuthStore.getState();
      console.log(loginForm);
  
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(loginForm),
        credentials: "include", // Allow sending cookies with the request
      });
  
      if (!response.ok) {
        // If the response status is not OK, throw an error to be caught in the catch block
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      set({ loggedIn: true });
      set({
        loginForm : {
          email : '',
          password: ''
        }
      })
      navigate('/');

    }catch(err){
      console.log(err)
    }
    
    
    
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`http://localhost:3000/check-auth`, {
        method: "GET",
        credentials: "include", // Allow sending cookies with the request
      });

      if (!response.ok) {
        // If the response status is not OK, throw an error to be caught in the catch block
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },

  logout : async() => {
    const res = fetch(`http://localhost:3000/logout`,{
      credentials: "include", // Allow sending cookies with the request
    })
    set({ loggedIn: false });
  }
}));

export default useAuthStore;
