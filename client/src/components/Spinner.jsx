import React from 'react'

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center'>
        <div className="spinner-border" role='status'>
            <span className='sr-only'>loading...</span>
        </div>
      
    </div>
  )
}

export default Spinner
