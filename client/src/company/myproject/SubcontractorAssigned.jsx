
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectNav from "./ProjectNav";
import { useSelector } from "react-redux";

const SubcontractorAssigned = () => {

  const [project, setProject] = useState();
  const [open, setOpen] = useState(false);
  const [resStatus, setResStatus] = useState(false);

  const filteredProject = useLocation();
  console.log(filteredProject, "filteredProject");

  const filterData = filteredProject?.state[0]
  const COMPANY_ID = filteredProject?.state[1]
  const COMPANY_USERNAME = filteredProject?.state[2]
  const COMPANY_PARENT_ID = filteredProject?.state[3]
  const COMPANY_PARENT_USERNAME = filteredProject?.state[4]


  const projectsData = useSelector(state => state?.allProjectData?.projects)
  console.log(projectsData, "Projectsdata")
  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.put("/api/get_assigned_subcontractor_to_project", {
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


  console.log(filterData, "project IN PROJECT")


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

        <ProjectNav filterData={filterData} active={5} COMPANY_ID={COMPANY_ID} COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} />
        <div className="myscreen p-3">
          <div className="container-fluid g-0">
            <div className="row">
              <div className="col-12">

                <table className="table table-fixed table-sm">
                  <thead>
                    <tr >
                      <td>
                        <b>S. No.</b>
                      </td>
                    
                      <td>
                        <b>Subcontractor Name</b>
                      </td>
                      <td>
                        <b>Subcontractor Email</b>
                      </td>
                      <td>
                        <b>Subcontractor Phone</b>
                      </td>
                      <td>
                        <b>Role</b>
                      </td>
                      <td>
                        <b>Subcontractor Supervisor</b>
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
                            <span>{assignproject?.SUBCONTRACTOR_NAME}</span>
                          </td>
                          <td>
                            <span>{assignproject?.SUBCONTRACTOR_USERNAME}</span>
                          </td>
                          <td>
                            <span>{assignproject?.SUBCONTRACTOR_PHONE}</span>
                          </td>
                          <td>
                            <span>{assignproject?.SUBCONTRACTOR_ROLE}</span>
                          </td>
                        
                          <td>
                            <span>{assignproject?.SUBCONTRACTOR_SUPERVISOR}</span>
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

export default SubcontractorAssigned;
