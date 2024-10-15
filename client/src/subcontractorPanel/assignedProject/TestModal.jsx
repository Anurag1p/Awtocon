import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const TestModal = () => {
  const companyData = useSelector((prev) => prev?.companyLogin?.user);
  const COMPANY_ID = companyData[0];
  const COMPANY_USERNAME = companyData[1];
  const COMPANY_PARENT_ID = companyData[2];
  const COMPANY_PARENT_USERNAME = companyData[3];
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={5}
        toggle={openNav}
        userType="subcontractor"
      />


      <Box className="box" style={{ background: "#277099" }}>
        <button
          variant={"outlined"}
          className="btn btn-sm btn-primary rounded-0 border-0  rounded-0 text-light btn-sm"
        >
          Assigned Projects
        </button>

        <div className="myscreen p-3">
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>

          </Box>
        </div>

      </Box>
    </>
  )
}

export default TestModal