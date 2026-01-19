import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)

    // now if any token available in browser local storage that will be stored in state var.
    const [token , setToken] = useState(localStorage.getItem('token'))
    const [credit , setCredit] = useState(null)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async () => {
		try{
		    const {data} = await axios.get(backendUrl + '/api/user/credits' , {headers : {token}})
            
            if(data.success){
					setCredit(data.credits)
					setUser(data.user)
				}
			}
			catch(error){
				console.log(error)
				toast.error(error.message)
			}
		}

    useEffect(()=> {
      if(token){
		loadCreditsData()
	}

    },[token])

    // function for genrating image through prompt

    const generateImage = async (prompt) => {
	    try{
			const {data} = await axios.post(backendUrl + '/api/image/generateimage', {prompt} , {headers : {token}})

            if(data.success){
				loadCreditsData()
				return data.resultImage  // that we are getting from api-response
			}
			else{
			    toast.error(data.message)
				loadCreditsData()

                if(data.creditBalance === 0 ){
					navigate('/buy')
				}
			}
        }
		catch (error){
            toast.error(error.message);
        }
			
	}



    // logout Fuctionality
    const logout = () => {
		localStorage.removeItem('token');
		setToken('')
		setUser(null)
	} 

    const value = {user, setUser, showLogin, setShowLogin , backendUrl , token ,setToken , credit , setCredit , logout , loadCreditsData , generateImage}

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider