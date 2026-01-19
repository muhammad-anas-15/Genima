import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-32'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-white'>How it Works</h1>
        <p className='text-lg text-brand-muted mb-12'>Transform Words into Stunning Images</p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item, index)=> (
                <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/5 border border-white/10 shadow-lg cursor-pointer hover:scale-[1.02] hover:bg-white/10 transition-all duration-300 rounded-xl'>
                    <img width={40} src={item.icon} alt="" className="filter invert opacity-80" /> {/* Invert icon for dark mode */}
                    <div>
                        <h2 className='text-xl font-medium text-white'>{item.title}</h2>
                        <p className='text-brand-muted/80'>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Steps