import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md: px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imaginations into visuals</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img className='w-80 xl:w-96 rounded-lg' src={assets.sample_img_1} alt="" />
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing AI-Powered Text to Image Generator</h2>
                <p className='text-gray-600 mb-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis eius optio dolorum distinctio repellendus, tenetur voluptates qui, praesentium alias atque porro quae sunt! At, iste.</p>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ut dolor dolore nesciunt doloribus alias quasi eaque eum excepturi hic?</p>
            </div>
        </div>
    </div>
  )
}

export default Description