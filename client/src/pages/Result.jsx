import React, {useState} from 'react'
import {assets} from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setloading] = useState(false)
  const [input, setInput] = useState('')

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => { 
    e.preventDefault();
    setloading(true);
    
    try {
        const resimage = await generateImage(input.trim());
        if (resimage) {
            setIsImageLoaded(true);
            setImage(resimage);
        }
    } catch (error) {
        console.error("Submission error:", error);
    } finally {
        setloading(false);
    }
}

  return (
    <div className='pt-10 min-h-[80vh] flex flex-col justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center'>
        <div>
          <div className='relative'>
            <img src={image} alt="" className='max-w-sm rounded-lg border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'/>
            {/* Loading Bar - Purple */}
            <span className={`absolute bottom-0 left-0 h-1 bg-brand-purple w-full transition-all duration-[10s] ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'} `}/>
          </div>
          <p className={!loading ? 'hidden': 'text-brand-purple mt-2 text-center animate-pulse' }>Generating...</p>
        </div>

         {/* Input Box - Glass Style */}
         {!isImageLoaded &&
         <div className='flex w-full max-w-xl bg-white/10 border border-white/10 text-white text-sm p-1 mt-10 rounded-full focus-within:border-brand-purple/50 transition-colors'>
          <input 
            onChange={e=> setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Describe what you want to generate' 
            className='flex-1 bg-transparent outline-none ml-6 text-white placeholder-gray-400'
          />
          <button type='submit' className='bg-brand-purple px-10 sm:px-16 py-3 rounded-full font-medium hover:bg-brand-light transition-colors'> Generate </button>
        </div>
        }

          {isImageLoaded && <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick = {() => {setIsImageLoaded(false)}} className='bg-transparent border border-white/20 text-white px-8 py-3 rounded-full cursor-pointer hover:bg-white/5 transition-colors'>Generate Another</p>
          <a href={image} className='bg-brand-purple px-10 py-3 rounded-full cursor-pointer hover:bg-brand-light transition-colors' download >Download</a>
        </div>
    }
      </form>
    </div>
  )
}

export default Result