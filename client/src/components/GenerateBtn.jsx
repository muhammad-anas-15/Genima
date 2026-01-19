import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const GenerateBtn = () => {
  const navigate = useNavigate()
  const { user, setShowLogin } = useContext(AppContext)

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <div className='pb-24 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white py-6 md:py-16'>
            See the magic. Try now
        </h1>
        
        <button 
          onClick={onClickHandler}
          className='relative inline-flex items-center gap-2 px-12 py-4 rounded-full bg-white text-black font-semibold m-auto hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.3)]'>
            Generate Images
            <img className='h-6' src={assets.star_group} alt="" />
        </button>
    </div>
  )
}

export default GenerateBtn