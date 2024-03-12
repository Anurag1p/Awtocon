import React from 'react'
import notfoundimg from "../assests/images/notfound.jpg"
const Notfound_404Page = () => {
  return (
  <>
  <div className="container-fluid">
  <div className="container d-flex ">
    <div className="message d-flex flex-column p-5  justify-content-center align-items-center w-50">
        <h1 className='text-danger fs-1 '>404</h1>
        <h3 className='text-dark'>OOPS! PAGE NPT FOUND</h3>
        <p className="notFound_msg text-center p-2 fs-6">
            Soory, the you're looking for doesn't exist. If you think <br /> something is broken, report a problem.
        </p>
        <div className="btn_groups w-50 d-flex justify-content-around">

        <button className='btn text-uppercase rounded border-0 bg-primary text-light p-2 btn-sm  '>return home</button>
        <button className='btn text-uppercase rounded border-0 bg-danger text-light p-2 btn-sm '>report problem</button> 
       </div>
        
    </div>
    <img src={notfoundimg} maxWidth={"50%"} className='w-50 h-100' />
  </div>

  </div>
  
  </>
  )
}

export default Notfound_404Page