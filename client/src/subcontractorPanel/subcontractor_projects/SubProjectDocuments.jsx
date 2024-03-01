import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import DocReusable from "../../components/DocReusable";
import SubProjectNav from "./SubProjectNav";


const SubProjectDocuments = () => {
  const filteredProject = useLocation();
  console.log(filteredProject, "uselocation")

  const filterData = filteredProject?.state[0]


  return (
    <>
      <Box
        style={{
          display: "block",
          height: "100vh",
        }}
        className="box position-absolute"
      >
     
        <SubProjectNav filterData={filterData} active={4}/>
        <div className="myscreen p-3">

          <DocReusable
            createEndpoint="/api/create_document"
            getDocEndPoint="/api/get_all_document"
            documentType="Project Document"
            deleteApiEndpoint="/api/delete_document"
            downloadApiEndpoint="/api/download_document"
            DOCUMENT_REF_ID={filterData?.PROJECT_ID}
            DOCUMENT_PARENT_USERNAME={filterData?.PROJECT_USERNAME}
            DOCUMENT_ADMIN_USERNAME={filterData?.PROJECT_MEMBER_PARENT_USERNAME}
          />
          
        </div>
      </Box>
    </>
  );
};

export default SubProjectDocuments;
