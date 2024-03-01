import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import SubProjectAssignNav from './SubProjectAssignNav';
import { Link, useLocation } from 'react-router-dom';
import TaskCreationModal from './TaskCreationModal';
import CreateTask from './CreateTask';
import { styled } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';
import Animations from '../../components/Animations';
import axios from 'axios';
import EditTask from './EditTask';
import SubGallery from './SubGallery';
const TaskSpliting = () => {

    const filteredProject = useLocation();
    const filterData = filteredProject?.state[0]
    const COMPANY_ID = filteredProject?.state[0]?.PROJECT_PARENT_ID
    const COMPANY_USERNAME = filteredProject?.state[0]?.PROJECT_PARENT_USERNAME
    const PROJECT_ID = filteredProject?.state[0]?.PROJECT_ID;
    const SUBCONTRCATOR_ID = filteredProject?.state[1]
    const SUBCONTRCATOR_USERNAME = filteredProject?.state[2]
    const COMPANY_PARENT_ID = filteredProject?.state[3]
    const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
    const [open, setOpen] = React.useState(false);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resStatus, setResStatus] = useState("success");
    const [taskData, setTaskData] = useState([]);

    console.log(taskData, "taskData")
    const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const handleCreateTask = (formData) => {
        // Logic to handle task creation
        console.log('Task created:', formData);
    };

    //  stylign for no rows of mui design 

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

    //   ended 
    const data = {
        TASK_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
        TASK_SUBCONTRACTOR_ID: SUBCONTRCATOR_ID,
        TASK_PROJECT_ID: PROJECT_ID
    }

    const fetchData = async () => {
        try {
            const response = await axios.put("/api/get_all_tasks", data);
            setTaskData(response.data.result);
        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, ['']);
  

    const columns = [

        { field: "TASK_ID", headerName: "ID", width: 90 },
        { field: "TASK_NAME", headerName: "Task Name", width: 150 },
        { field: "TASK_VALUE", headerName: "Value", width: 150 },
        { field: "TASK_DESCRIPTION", headerName: "Task Discription", width: 150 },
        { field: "TASK_START_DATE", headerName: "Start Date", width: 150 },
        { field: "TASK_END_DATE", headerName: "End Date", type: "number", width: 100 },
        { field: "TASK_PROJECT_LEAD", headerName: "Task Lead", width: 120 },

        {
            field: "details",
            headerName: "Details",
            width: 80,
            renderCell: (cellValues) => {
              console.log(cellValues, "cellvalue")
              return (
                //   <>
                //   <Link className="bg-light text-dark nav-link" to={`/subcontractor/assigned-projects/task/gallery`}>Details</Link>
                // </>
                 <Button  className='view-btn btn btn-sm'>
                  {/* <SubGallery tasksDetails={cellValues} refetch={fetchData} /> */}

                  Details
                 </Button>
              )
            },
          },
        {
            field: "edit",
            headerName: "Edit",
            width: 80,
            renderCell: (cellValues) => {
                return (
                    <Button className='btn btn-sm btn-success'>
                        {/* <EditTask editsubcontract={cellValues} refetch={fetchData} /> */}
                        Edit
                    </Button>
                )
            },
        },
    ];


    const rows = taskData;


    return (
        <>
            <Box
                style={{
                    display: "block",
                    height: "100vh",
                }}
                className="box position-absolute"
            >
                <SubProjectAssignNav
                    filterData={filterData}
                    active={4} COMPANY_ID={SUBCONTRCATOR_ID}
                    COMPANY_USERNAME={SUBCONTRCATOR_USERNAME}
                    COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                    COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />



                <CreateTask
                    COMPANY_ID={COMPANY_ID}
                    COMPANY_USERNAME={COMPANY_USERNAME}
                    COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                    COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                    name={"Subcontractor"}
                />

                <div className="myscreen p-3">

                    <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                        {resStatus === "success" ? (

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                sx={{ border: "none", height: '80vh' }}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 14,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableMultipleSelection
                                density="compact"
                                slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                                getRowId={(row) => row._id}
                            />
                        ) : resStatus === "error" ? (
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
                                                // onClick={getAllTasks}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Retry
                                            </button>
                                        </center>
                                    </small>
                                </div>
                            </Box>
                        ) : <Animations />}
                    </Box>

                </div>



            </Box>
        </>
    )
}

export default TaskSpliting