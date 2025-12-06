import React from 'react'


const Stripe = ({val}) => {
  // console.log(val)
  return (
    
    <div className='w-[16.666%] px-10 py-[17px] border-t-[1.2px]  border-b-[1.2px] border-r-[1.2px] border-zinc-600 flex items-center gap-8 justify-center'>
       <img src={val.url} alt="not loaded" />
       <span className='font-semibold'>{val.number}</span>
    </div>
  )
}

export default Stripe;