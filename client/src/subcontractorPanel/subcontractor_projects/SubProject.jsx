import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ProjectEdit from "./SubProjectEdit";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Animations from "../../components/Animations";
import { getProjectData } from "../../redux/slice/getallProjectSlice";
import SubProjectCreate from "./SubProjectCreate";

const SubProject = () => {
  
  // company Login Data 
  const companyData = useSelector(state => state?.companyLogin?.user);

  const COMPANY_ID = companyData?.[0]
  const COMPANY_USERNAME = companyData?.[1]
  const COMPANY_PARENT_ID = companyData?.[2]
  const COMPANY_PARENT_USERNAME = companyData?.[3]

  console.log("companyData1", companyData)
  // Project data 

  const projectData = useSelector(state => state?.allProjectData.projects)
  
console.log("hhelo world = >", projectData)

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ row: {} });
  const [resStatus, setResStatus] = useState(false);
  
  const navigate = useNavigate();


  const handleClick = (event) => {
    navigate("/subcontractor/projects/detail", {
      state: [
        event.row,
      ],
    });
  };


  const columns = [
    { field: 'sr', headerName: 'S No.', width: 60, renderCell: (params) => params.row.id + 1 },
    { field: "PROJECT_ID", headerName: "ID", width: 60 },
    {
      field: "PROJECT_USERNAME",
      headerName: "Username",
      width: 120,
    },
    {
      field: "PROJECT_NAME",
      headerName: "Name",
      width: 120,
    },
    {
      field: "PROJECT_ACCOUNT",
      headerName: "Account",
      width: 130,
    },
    {
      field: "PROJECT_START_DATE",
      headerName: "Start Date",
      width: 100,
    },
    {
      field: "PROJECT_END_DATE",
      headerName: "End Date",
      type: "number",
      width: 100,
    },

    {
      field: "PROJECT_SUPERVISOR",
      headerName: "Supervisor",
      width: 150,
    },

    {
      field: "PROJECT_VALUE",
      headerName: "Project Value",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <span>
            {cellValues.row.PROJECT_VALUE} {cellValues.row.PROJECT_CURRENCY}
          </span>
        );
      },
    },

    {
      field: "PROJECT_TYPE",
      headerName: "Project Type",
      width: 140,
    },

    {
      field: "action",
      headerName: "Detail",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn primary btn btn-success"
            style={{ padding: "2px 2px" }}
            onClick={() => {
              handleClick(cellValues);
            }}
          >
            view
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (cellValues) => {
        return (
          // <Button>
            <ProjectEdit edit={cellValues} />
          // </Button>
        );
      },
    },
  ];

  // ui design for no rows in mui 
  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));
  
  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          style={{ flexShrink: 0 }}
          width="240"
          height="200"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }

  // const rows = projectData;
  const rows = projectData.map((project, index) => ({
    ...project,
    id: index + 1,
  }));
  // const filterData = data?.row;

  return (
    <>
      <Sidebar
        active={1}
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        userType="subcontractor"
      />

      <Box className="box" style={{ background: "#277099" }}>
        {/* <Navbar toggle={() => setOpenNav((e) => !e)} name={COMPANY_USERNAME} /> */}
        {/* { projectData && projectData.length > 0 && <SubProjectCreate /> } */}
        <SubProjectCreate />

        <div className="myscreen p-3">
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
            <>    
             { projectData && projectData.length > 0  ? (<DataGrid
                sx={{ border: "none" }}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.PROJECT_ID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                density="compact"
                pageSizeOptions={[5]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                
              />) : resStatus === "error" ? (
                <Box>
                  <div
                    className="p-3"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <small className="text-dark">
                      <p>Check your connection and try again. :(</p>
                      <center>
                        <button
                          onClick={getProjectData}
                          className="btn btn-sm btn-secondary"
                        >
                          Retry
                        </button>
                      </center>
                    </small>
                  </div>
                </Box>
              ) : (
                <Box>
                  <div
                    className="p-3"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <RotatingLines
                      strokeColor="#2D5169"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="50"
                      visible={true}

                    />
                  </div>
                </Box>
              )} 
            </>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default SubProject;
