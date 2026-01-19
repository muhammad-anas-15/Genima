import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
      if(user){
          navigate('/result')
      }else{
          setShowLogin(true)
      }
  }

  return (
    <div className='flex flex-col justify-center items-center text-center my-20 relative'>
        
        {/* Badge */}
        <div className='inline-flex text-center gap-2 bg-white/5 border border-white/10 px-6 py-1.5 rounded-full mb-10'>
            <p className='text-brand-muted text-xs uppercase tracking-wider'>Best text to Image generator</p>
            <img src={assets.star_icon} alt="" className='opacity-80' />
        </div>

        {/* Title */}
        <h1 className='text-5xl sm:text-7xl max-w-[800px] mx-auto text-center font-bold leading-tight'>
            Generate <span className='text-gradient'>Stunning</span> <br /> 
            <span className='text-gradient'>AI Images</span> in One Line Text.
        </h1>

        {/* Subtitle */}
        <p className='text-center max-w-xl mx-auto mt-6 text-brand-muted text-lg font-light'>
            Turn your text prompt into high-quality visual assets instantly. 
            Trusted by creators worldwide.
        </p>

        {/* CTA Button (Styled to look like the input/button combo in reference) */}
        <button onClick={onClickHandler} className='mt-12 group relative w-full max-w-lg'>
             {/* Glow effect */}
             <div className='absolute -inset-1 bg-gradient-to-r from-brand-purple to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500'></div>
             
             <div className='relative flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6'>
                 <span className='text-gray-400 text-sm'>Try "A cyberpunk city at night"...</span>
                 <span className='bg-brand-purple text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-brand-light transition-colors shadow-[0_0_15px_rgba(140,70,255,0.4)]'>
                    Generate
                 </span>
             </div>
        </button>

        {/* Gallery */}
        <div className='flex flex-wrap justify-center mt-20 gap-4 opacity-90'>
            {Array(6).fill('').map((item, index)=>(
                <img 
                    className='rounded hover:scale-105 hover:shadow-[0_0_20px_rgba(140,70,255,0.3)] transition-all duration-300 cursor-pointer max-sm:w-16 border border-white/5' 
                    src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} 
                    alt="" 
                    key={index} 
                    width={70}
                />
            ))}
        </div>

        <p className='mt-4 text-brand-muted/50 text-xs tracking-widest uppercase'>Generated images from Genima</p>
    </div>
  )
}

export default Header