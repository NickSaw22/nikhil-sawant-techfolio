import React from 'react'
import Card from './Card'

const Cards = () => {
  return (
    <div className='w-full bg-zinc-900'>
        <div className='max-w-screen-xl mx-auto flex py-20 gap-2 '>
            <Card width={"basis-1/3"} start={false} para={true} title="up Next: News" tagline="Insights and behind the scenes" end="explore what driven our team" />
            <Card width={"basis-2/3"} start={true} para={false} title="Get in Touch" tagline="Let's get to it, together" end="Start a Project" hover={"true"} />
            {/* <Card width={"basis-2/3"} start={true}  para={false} hover="true"/> */}
        </div>
    </div>
  )
}

export default Cards