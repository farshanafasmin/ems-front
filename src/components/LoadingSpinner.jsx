import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    <>
    
    <div className='d-flex justify-content-center align-items-center m-5 fw-bold'>

    <Spinner animation="grow" variant="light" />Loading..................

    </div>
    
    
    </>
  )
}

export default LoadingSpinner