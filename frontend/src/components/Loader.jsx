import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
        <div className="flex gap-5 text-2xl font-semibold sm:text-[15px]">
            <h1 className="text-tertiary s">S</h1>
            <h1 className="text-tertiary u">u</h1>
            <h1 className="text-tertiary d">d</h1>
            <h1 className="text-tertiary h">h</h1>
            <h1 className="text-tertiary a">a</h1>

          
        </div>
    </div>
  )
}

export default Loader