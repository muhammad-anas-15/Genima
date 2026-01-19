import React from 'react'
import {assets} from '../assets/assets';
const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-10 mt-20 border-t border-white/10'>
        {/* Brightness filter to make logo visible on dark bg */}
        <img src={assets.logo} alt="" width={50} className="brightness-200" />
        
        <p className='flex-1 border-l border-white/20 pl-4 text-sm text-brand-muted max-sm:hidden'>
            Copyright @Muhammad Anas | All right reserved
        </p>
        
        <div className='flex gap-4'>
            <img src={assets.facebook_icon} alt="" width={30} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity invert" />
            <img src={assets.twitter_icon} alt="" width={30} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity invert" />
            <img src={assets.instagram_icon} alt="" width={30} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity invert" />
        </div>
    </div>
  )
}

export default Footer