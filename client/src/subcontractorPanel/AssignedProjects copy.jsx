import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubcontractor } from '../redux/slice/SubContractorSlice';
import axios from 'axios';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';


const AssignedProjects = ({ state }) => {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();

  const companyData = useSelector((prev) => prev?.companyLogin?.user);
  const COMPANY_ID = companyData[0];
  const COMPANY_USERNAME = companyData[1];
  const COMPANY_PARENT_ID = companyData[2];
  const COMPANY_PARENT_USERNAME = companyData[3];
  const [subcontractor, setSubcontractor] = useState([]);
  const [project, setProject] = useState([]);
  console.log(project, "projects")


  console.log(subcontractor, "subcontractor")
  const allSubcontractors = useSelector(state => state?.allsubcontractor?.subcontractor);

  useEffect(() => {
    const fetchsubcontractorData = async () => {
      try {
        const empDataConfig = {
          method: "put",
          maxBodyLength: Infinity,
          url: "/api/get_subcontractor_indiviual_project",
          data: {
            ADMIN_USERNAME: state[3],
            SUBCONTRACTOR_ID: state[0],
          },
        };

        const response = await axios.request(empDataConfig);
        const data = response.data;

        if (data.result) {
          setSubcontractor(data.result);
        }
        console.log(data, "Employee data");
      } catch (error) {
        console.error(error, "Error fetching employee data");
      }
    };
    fetchsubcontractorData();
  }, [state[3]]);


  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const requests = subcontractor.SUBCONTRACTOR_ASSIGN.map((item) => {
          const {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          } = item;

          const projectData = {
            PROJECT_ID,
            PROJECT_PARENT_ID,
            PROJECT_MEMBER_PARENT_ID,
            PROJECT_MEMBER_PARENT_USERNAME,
            PROJECT_USERNAME,
          };

          return axios.put("/api/get_projects_one", projectData);
        });

        const responses = await Promise.all(requests);

        const arry = responses.map((response) => response.data.result[0]);
        if (arry) {
          setProject(arry);
          console.log(arry, "Projects data");
        }
      } catch (error) {
        console.error(error, "Error fetching projects data");
      }
    };

    // Check if subcontractor.EMPLOYEE_ASSIGN has changed
    if (subcontractor.SUBCONTRACTOR_ASSIGN && subcontractor.SUBCONTRACTOR_ASSIGN.length > 0) {
      fetchProjectsData();
    }
  }, [subcontractor.SUBCONTRACTOR_ASSIGN]);

  const columns = [
    { field: 'PROJECT_NAME', headerName: 'Name', width: 200 },
    { field: 'PROJECT_SUPERVISOR', headerName: 'Project Supervisor', width: 200 },
    { field: 'PROJECT_START_DATE', headerName: 'Start Date', width: 150 },
    { field: 'PROJECT_END_DATE', headerName: 'End Date', width: 150 },
    { field: 'PROJECT_VALUE', headerName: 'Project Value', width: 150 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <Link className="btn btn-sm btn-primary" to={`/subcontractor/gallery`}>View</Link>
        ),
    },
];

const rowsWithIds = project.map((item, index) => ({ ...item, id: item.PROJECT_ID }));


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
          My Employees
        </button>

        <div className="myscreen p-3">
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
         {project.length > 0 ?   <DataGrid
              rows={rowsWithIds}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
            :  <p>There is no any projects assinged yet...</p>}
          </Box>
        </div>

      </Box>


    </>
  );
};

export default AssignedProjects;
