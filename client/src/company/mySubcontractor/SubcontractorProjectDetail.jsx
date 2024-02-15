
import React from 'react'
import SubcontractorNav from './SubcontractorNav';
import ImagesUpload from '../../subcontractorPanel/assignedProject/SubSiteImagesUpload';

const SubcontractorProjectDetail = ({ subcontractor, images }) => {

  const maxLength = 100;

  return (
    <>


      <div className="container-fluid g-0">

        <SubcontractorNav subcontractor={subcontractor} project="My Projects" gallery={"Gallery"} />




        <div className="container">

          <ImagesUpload maxLength={maxLength} />
        </div>

        <hr />


      </div>

    </>
  )
}

export default SubcontractorProjectDetail