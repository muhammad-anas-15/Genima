import React, {useState, useEffect, useContext} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

const [state, setState] = useState('Login')
const {setShowLogin ,backendUrl ,  setToken , setUser} = useContext(AppContext)

const [name , setName] = useState('')
const [email , setEmail] = useState('')
const [password , setPassword] = useState('')

const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        if(state === 'Login'){
            const {data} =await axios.post(backendUrl + '/api/user/login' , {email , password})
            if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token' , data.token)
                setShowLogin(false)
            } else{
                toast.error(data.message)
            }
        } else{
            const {data} =await axios.post(backendUrl + '/api/user/register' , { name , email , password}) 
            if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token' , data.token)
                setShowLogin(false)
            } else{
                toast.error(data.message)
            }
        }
    } catch (error) {
        toast.error(error.message)
    }
}

useEffect(()=> {
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'unset';
    }
}, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md bg-black/60 flex justify-center items-center'>
        
        <form onSubmit={onSubmitHandler} className='relative bg-brand-dark/90 border border-white/10 p-10 rounded-2xl text-brand-text w-full max-w-sm shadow-[0_0_50px_rgba(140,70,255,0.15)]'>
            <h1 className='text-center text-3xl font-medium mb-2'>{state}</h1>
            <p className='text-sm text-center text-brand-muted mb-6'>Welcome back! Please sign in to continue</p>
            
           {state !== 'Login' && <div className='bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3 rounded-full mt-4'>
                <img src={assets.user_icon} alt="" className="opacity-70 invert" />
                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Full Name' required className='bg-transparent outline-none text-sm w-full'/>
            </div> }

            <div className='bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" className="opacity-70 invert" />
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='Email id' required className='bg-transparent outline-none text-sm w-full'/>
            </div>

            <div className='bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" className="opacity-70 invert" />
                <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder='Password' required className='bg-transparent outline-none text-sm w-full'/>
            </div>

            <p className='text-sm text-brand-purple my-4 cursor-pointer hover:text-white transition-colors text-right'>Forgot Password?</p>
            
            <button type="submit" className='bg-brand-purple w-full text-white py-3 rounded-full font-medium hover:bg-brand-light transition-all'>
                {state === 'Login' ? 'Login' : 'Create Account'}
            </button>

            {state === 'Login' ?  
                <p className='mt-5 text-center text-sm'>Don't have an account? <span className='text-brand-purple cursor-pointer font-medium hover:text-white' onClick={()=> setState('Sign Up')}>Sign up</span> </p> 
            : 
                <p className='mt-5 text-center text-sm'>Already have an account? <span className='text-brand-purple cursor-pointer font-medium hover:text-white' onClick={()=> setState('Login')}> Login </span> </p> 
            }
            
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer invert opacity-70 hover:opacity-100'/>
        </form>
    </div>
  )
}

export default Login