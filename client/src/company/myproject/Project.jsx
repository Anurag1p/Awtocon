import React, { useState, useEffect } from "react";
import ProjectCreate from "./ProjectCreate";
import { Box, Button, Paper, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ProjectEdit from "./ProjectEdit";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
// import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Animations from "../../components/Animations";
import { getProjectData } from "../../redux/slice/getallProjectSlice";
import Navbar from "../../components/Navbar";

import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";

const Project = () => {

  const companyData = useSelector(state => state?.companyLogin?.user);
  const COMPANY_ID = companyData?.[0]
  const COMPANY_USERNAME = companyData?.[1]
  const COMPANY_PARENT_ID = companyData?.[2]
  const COMPANY_PARENT_USERNAME = companyData?.[3]
  const dispatch = useDispatch();

  // Project data 


  useEffect(() => {
    dispatch(getProjectData({
      PROJECT_PARENT_ID: COMPANY_ID,
      PROJECT_PARENT_USERNAME: COMPANY_USERNAME,
      PROJECT_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      PROJECT_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
    })).then(() => setResStatus("success")) // Update state to "success" when data fetching is complete
      .catch(() => setResStatus("error"));
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME])

  const projectData = useSelector(state => state?.allProjectData.projects)


  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ row: {} });
  const [resStatus, setResStatus] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const handleOpen = () => setOpen(true);

  const navigate = useNavigate();


  const handleClick = (event) => {
    navigate("/company/projects/detail", {
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
        userType="company"
        toggle={openNav}
      />

      {/* <Box className="box" style={{ background: "#277099" }}> */}
      <Box
        style={{
          display: "block",
          height: "100vh",
        }}
        className="box position-absolute"
      >
        <Navbar toggle={() => setOpenNav((e) => !e)} name={COMPANY_USERNAME} />
        {/* <button
          size="small"
          variant={"outlined"}
          className={"btn button border-bottom-0 bg-white btn-sm"}
        >
          My Projects
        </button>
        <button
          onClick={handleOpen}
          sx={{ color: "#277099" }}
          className="btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"
          // variant="contained"
          size="small"
        >
          + Add New Project
        </button> */}
        {/* {projectData && projectData.length > 0 && <ProjectCreate />} */}
        <ProjectCreate />

        <div className="myscreen p-3">
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
            <>
              {projectData && projectData.length > 0 ? (<DataGrid
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
                  {/* <div
                    className="p-3"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  > */}
                    <Animations />
                  {/* </div> */}
                </Box>
              )}
            </>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Project;
