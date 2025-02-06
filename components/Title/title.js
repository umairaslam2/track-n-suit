import React from 'react'

const Title = ({title,subTitle}) => {
  return (
    <div className='flex justify-center flex-col items-center w-full py-10'>
        <h1 className='text-6xl font-bold capitalize pb-2'>{title}</h1>
        <h3 className='text-xl  font-semibold text-center'>{subTitle}</h3>
    </div>
  )
}

export default Title