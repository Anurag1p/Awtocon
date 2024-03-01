
import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SubProjectAssignNav from './SubProjectAssignNav';
import SubSiteImagesUpload from './SubSiteImagesUpload';
import "../../assests/css/gallery.css"
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const SubGallery = ({ taskId }) => {
  const filteredProject = useLocation();
  const filterData = filteredProject?.state[0]
  const COMPANY_ID = filteredProject?.state[0]?.PROJECT_PARENT_ID
  const COMPANY_USERNAME = filteredProject?.state[0]?.PROJECT_PARENT_USERNAME
  const PROJECT_ID = filteredProject?.state[0]?.PROJECT_ID;
  const SUBCONTRCATOR_ID = filteredProject?.state[1]
  const SUBCONTRCATOR_USERNAME = filteredProject?.state[2]
  const COMPANY_PARENT_ID = filteredProject?.state[3]
  const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
  const TASK_IMAGE_TASK_ID = taskId.TASK_ID
  // Treating subcontractor_username as company_username
  console.log(filterData, "filterData")

  const maxLength = 100;



  return (
    <>

      <div className="container-fluid mt-2">
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link color="inherit" href="/subcontractor/assigned-projects/tasks" className='cursor-pointer text-decoration-none'>
            Back
          </Link>
          <Typography className='text-primary'>Gallery</Typography>
        </Breadcrumbs>

        <Accordion
          className="container-fluid mt-2"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="container-fluid text-capitalize text-primary"
          >
            Click here more task details
          </AccordionSummary>
          <AccordionDetails>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <b className='text-capitalize'>Task Name</b>
                  <p className="bg-light text-dark p-2 rounded-2 text-capitalize">
                    {taskId?.TASK_NAME}
                  </p>
                </div>
                <div className="col-md-4">
                  <b className='text-capitalize'>Description</b>
                  {taskId?.TASK_DESCRIPTION ? <p className="bg-light text-dark p-2 rounded-2 text-capitalize">
                    {taskId?.TASK_DESCRIPTION}
                  </p> : <p className="bg-light text-dark p-2 rounded-2 text-capitalize border border-danger">
                    <span className='text-capitalize text-danger'>Please provide the task description...</span>
                  </p>}
                </div>
                <div className="col-md-2">
                  <b className='text-capitalize'> Project Location</b>
                  <p className="bg-light text-dark p-2 rounded-2 text-capitalize">
                    {filterData?.LOCATION_NAME}
                  </p>
                </div>
                <div className="col-2">
                  <b className='text-capitalize'>Task Value</b>
                  <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{taskId?.TASK_VALUE}</p>
                </div>
                <div className="col-md-2">
                  <b className='text-capitalize'>Foreman</b>
                  <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{taskId?.TASK_PROJECT_LEAD}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <b className='text-capitalize'>Task Start Date</b>
                  <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{taskId?.TASK_START_DATE}</p></div>
                <div className="col-md-2">
                  <b className='text-capitalize'>task end Date</b>
                  <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{taskId?.TASK_END_DATE}</p></div>
              </div>


            </div>
          </AccordionDetails>
        </Accordion>

        <SubSiteImagesUpload
          TASK_IMAGE_SUBCONTRACTOR_ID={SUBCONTRCATOR_ID}
          TASK_IMAGE_PARENT_USERNAME={COMPANY_USERNAME}
          TASK_IMAGE_TASK_ID={taskId?.TASK_ID}
          TASK_IMAGE_PARENT_ID={COMPANY_ID}
          TASK_IMAGE_MEMBER_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
          TASK_IMAGE_MEMBER_PARENT_ID={COMPANY_PARENT_ID}
          TASK_IMAGE_PROJECT_ID={PROJECT_ID}
        />

      </div>

    </>
  )
}

export default SubGallery
