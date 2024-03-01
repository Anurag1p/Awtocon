
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectNav from "./ProjectNav";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const ProjectAllocate = () => {
  const [project, setProject] = useState();
  const [open, setOpen] = useState(false);
   const [resStatus, setResStatus] = useState(false);
  const filteredProject = useLocation();
  const filterData = filteredProject?.state[0]
  const COMPANY_ID = filteredProject?.state[1]
  const COMPANY_USERNAME = filteredProject?.state[2]
  const COMPANY_PARENT_ID = filteredProject?.state[3]
  const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
  

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.put("/api/get_assigned_employees", {
                  "PROJECT_ID": filterData.PROJECT_ID,
                  "PROJECT_MEMBER_PARENT_USERNAME": filterData.PROJECT_MEMBER_PARENT_USERNAME
                });
        const data = response.data;
        setResStatus(true);
        setProject(data?.result.assignedProjects);
      } catch (err) {
        console.log("Something Went Wrong: =>", err);
        setResStatus("error");
      }
    };

    fetchData();
  }, [filterData]);


  console.log(filterData,"project IN PROJECT")


  return (
    <>
      <Box
        style={{
          display: "block",
          height: "100vh",
        }}
        className="box position-absolute"
      >
        {/* <Navbar toggle={() => setOpenNav((e) => !e)} name={COMPANY_USERNAME} /> */}

        <ProjectNav filterData={filterData} active={2}  COMPANY_ID={COMPANY_ID}  COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} />
        <div className="myscreen p-3">
          <div className="container-fluid g-0">
          <Accordion
                        className="container-fluid mt-2"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="container-fluid text-capitalize text-primary"
                        >
                            <PanToolAltIcon />  <p style={{ fontSize: "15px", margin: "5px", color: "#198754" }}> Click here for more task details</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-2">
                                        <b className='text-capitalize'>Project Name</b>
                                        <p className="bg-light text-dark p-2 rounded-2 text-capitalize">
                                            {filterData?.PROJECT_NAME}
                                        </p>
                                    </div>
                                    <div className="col-md-2">
                                        <b className='text-capitalize'>Description</b>
                                        {filterData?.PROJECT_TYPE ? <p className="bg-light text-dark p-2 rounded-2 text-capitalize">
                                            {filterData?.PROJECT_TYPE}
                                        </p> : <p className="bg-light text-dark p-2 rounded-2 text-capitalize border border-danger">
                                            <span className='text-capitalize text-danger'>Please provide the task description...</span>
                                        </p>}
                                    </div>
                                    <div className="col-md-6">
                                        <b className='text-capitalize'> Project Location</b>
                                        <p className="bg-light text-dark p-2 rounded-2 text-capitalize">
                                            {filterData?.LOCATION_NAME}
                                        </p>
                                    </div>
                                    <div className="col-2">
                                        <b className='text-capitalize'>Project Value</b>
                                        <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{filterData?.PROJECT_VALUE}</p>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <b className='text-capitalize'>supervisor</b>
                                        <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{filterData?.PROJECT_SUPERVISOR}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <b className='text-capitalize'>project Start Date</b>
                                        <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{filterData?.PROJECT_START_DATE}</p></div>
                                    <div className="col-md-2">
                                        <b className='text-capitalize'>project end Date</b>
                                        <p className="bg-light text-dark p-2 rounded-2 text-capitalize">{filterData?.PROJECT_END_DATE}</p></div>
                                </div>


                            </div>
                        </AccordionDetails>
                    </Accordion>
            <div className="row">
              <div className="col-12">

                <table className="table table-fixed table-sm">
                  <thead>
                    <tr >
                      <td>
                        <b>S. No.</b>
                      </td>
                      <td>
                        <b>Employee ID</b>
                      </td>
                      <td>
                        <b>Employee Name</b>
                      </td>
                      <td>
                        <b>Employee Email</b>
                      </td>
                      <td>
                        <b>Employee Phone</b>
                      </td>
                      <td>
                        <b>Hourly Wages</b>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {project?.map((assignproject, key) => (
                      <>
                        <tr key={key}>
                          <td>
                            {key + 1}
                          </td>
                          <td>
                            <span>{assignproject.EMPLOYEE_ID}</span>
                          </td>
                          <td>
                            <span>{assignproject.EMPLOYEE_NAME}</span>
                          </td>
                          <td>
                            <span>{assignproject.EMPLOYEE_USERNAME}</span>
                          </td>
                          <td>
                            <span>{assignproject.EMPLOYEE_PHONE}</span>
                          </td>
                          <td>
                            <span>{assignproject.EMPLOYEE_HOURLY_WAGE}</span>
                          </td>

                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProjectAllocate;
