import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
      <Image src={"https://res.cloudinary.com/denyah3ls/image/upload/v1716386344/mifwrz1trf113jk6v1ij.jpg"} width={500} height={50} className='w-96 h-full'/>
    </div>
  )
}

export default page
