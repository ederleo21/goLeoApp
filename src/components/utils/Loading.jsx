import React from 'react'
import { Puff } from 'react-loader-spinner'

export const Loading = () => {


  return (
    <>
      <div className="spinner-container flex items-center justify-center">
           <Puff
           height={'50vh'}
           width={80}
           color="#02e"
           ariaLabel="oval-loading"
           secondaryColor="#0ee"
           strokeWidth={7}
           strokeWidthSecondary={7}
           />
       </div>
    </>
  )
}



