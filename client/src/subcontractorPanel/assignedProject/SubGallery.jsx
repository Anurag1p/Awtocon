import React, { useState } from 'react'
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SubProjectAssignNav from './SubProjectAssignNav';
import SubSiteImagesUpload from './SubSiteImagesUpload';

const SubGallery = () => {
  const [openNav, setOpenNav] = useState(false);

  // const companyData = useSelector((prev) => prev?.companyLogin?.user);
  // const COMPANY_ID = companyData[0];
  // const COMPANY_USERNAME = companyData[1];
  // const COMPANY_PARENT_ID = companyData[2];
  // const COMPANY_PARENT_USERNAME = companyData[3];

  const filteredProject = useLocation();

  console.log(filteredProject, "uselocation")
  const filterData = filteredProject?.state[0]
  const COMPANY_ID = filteredProject?.state[1]
  const COMPANY_USERNAME = filteredProject?.state[2]
  const COMPANY_PARENT_ID = filteredProject?.state[3]
  const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
  const maxLength = 100;
  return (
    <>
      <Box
        style={{
          display: "block",
          height: "100vh",
        }}
        className="box position-absolute"
      >

        <SubProjectAssignNav filterData={filterData} active={2} COMPANY_ID={COMPANY_ID} COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} />

        <div className="myscreen">
          <div className="container">
            <SubSiteImagesUpload maxLength={maxLength} />

          </div>
        </div>

      </Box>


    </>
  )
}

export default SubGallery