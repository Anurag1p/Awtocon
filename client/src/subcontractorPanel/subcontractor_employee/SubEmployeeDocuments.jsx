import React from "react";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import DocReusable from "../../components/DocReusable";
import SubEmployeeNav from "./SubEmployeeNav";

const SubEmployeeDocuments = () => {

  const filteredEmployee = useLocation();
  const filterData = filteredEmployee?.state[0];
  const COMPANY_ID = filteredEmployee?.state[1];
  const COMPANY_USERNAME = filteredEmployee?.state[2];
  const COMPANY_PARENT_ID = filteredEmployee?.state[3];
  const COMPANY_PARENT_USERNAME = filteredEmployee?.state[4];



  return (
    <Box
      style={{
        display: "block",
        height: "100vh",
      }}
      className="box position-absolute"
    >

      <SubEmployeeNav
        filterData={filterData}
        active={4}
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
      />
      <div className="myscreen p-3">
        <>
          <DocReusable
            DOCUMENT_REF_ID={filterData?.EMPLOYEE_ID}
            DOCUMENT_PARENT_USERNAME={filterData?.EMPLOYEE_USERNAME}
            DOCUMENT_ADMIN_USERNAME={filterData?.EMPLOYEE_MEMBER_PARENT_USERNAME}
          />

        </>
      </div>
    </Box>
  );
};

export default SubEmployeeDocuments;
