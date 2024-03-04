import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import SubProjectAssignNav from './SubProjectAssignNav';
import { useLocation } from 'react-router-dom';
import CreateTask from './CreateTask';
import { DataGrid } from '@mui/x-data-grid';
import Animations from '../../components/Animations';
import axios from 'axios';
import SubGallery from './SubGallery'; // Import the SubGallery component
import CustomNoRowsOverlay from '../../components/CustomNoRowsOverlay';


const TaskSpliting = () => {
    const filteredProject = useLocation();
    const filterData = filteredProject?.state[0];
    const COMPANY_ID = filteredProject?.state[0]?.PROJECT_PARENT_ID;
    const COMPANY_USERNAME = filteredProject?.state[0]?.PROJECT_PARENT_USERNAME;
    const PROJECT_ID = filteredProject?.state[0]?.PROJECT_ID;
    const SUBCONTRCATOR_ID = filteredProject?.state[1];
    const SUBCONTRCATOR_USERNAME = filteredProject?.state[2];
    const COMPANY_PARENT_ID = filteredProject?.state[3];
    const COMPANY_PARENT_USERNAME = filteredProject?.state[4];
    const [open, setOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resStatus, setResStatus] = useState("success");
    const [taskData, setTaskData] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null); // State to store the selected task id
    const handleOpen = () => setOpen(true);
    

    const data = {
        TASK_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
        TASK_SUBCONTRACTOR_ID: SUBCONTRCATOR_ID,
        TASK_PROJECT_ID: PROJECT_ID
    };

    const fetchData = async () => {
        try {
            const response = await axios.put("/api/get_all_tasks", data);
            setResStatus("loading");
            setTaskData(response.data.result);
            setResStatus("success");
        } catch (error) {
            console.error("Error fetching data:", error);
            setResStatus("error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetailButtonClick = (taskId) => {
        setIsModalOpen(true);
        setSelectedTaskId(taskId);
    };

    const columns = [
        { field: "TASK_ID", headerName: "ID", width: 50 },
        { field: "TASK_NAME", headerName: "Task Name", width: 120 },
        { field: "TASK_VALUE", headerName: "Value", width: 100 },
        { field: "TASK_DESCRIPTION", headerName: "Task Description", width: 150 },
        { field: "TASK_START_DATE", headerName: "Start Date", width: 100 },
        { field: "TASK_END_DATE", headerName: "End Date", type: "number", width: 100 },
        { field: "TASK_PROJECT_LEAD", headerName: "Task Lead", width: 120 },
        { field: "TASK_ADVANCE_AMOUNT", headerName: "Advance Pay", type: "number", width: 100 },
        { field: "TASK_REMAINING_AMOUNT", headerName: "Remaining Pay", width: 120 },
        {
            field: "details",
            headerName: "Details",
            width: 80,
            renderCell: (cellValues) => {
                return (
                    <button
                        variant="contained"
                        className="view-btn btn btn-primary"
                        style={{ padding: "2px 8px" }}
                        onClick={() => handleDetailButtonClick(cellValues.row)}
                    >
                        Detail
                    </button>
                );
            },
        },
        {
            field: "edit",
            headerName: "Edit",
            width: 80,
            renderCell: (cellValues) => {
                return (
                    <Button className='btn btn-sm btn-success'>
                        Edit
                    </Button>
                );
            },
        },
    ];

    return (
        <Box
            style={{
                display: "block",
                height: "100vh",
            }}
            className="box position-absolute"
        >
            <SubProjectAssignNav
                filterData={filterData}
                active={4}
                COMPANY_ID={SUBCONTRCATOR_ID}
                COMPANY_USERNAME={SUBCONTRCATOR_USERNAME}
                COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
            />

            {!isModalOpen ? (
                <>
                    <CreateTask
                        COMPANY_ID={COMPANY_ID}
                        COMPANY_USERNAME={COMPANY_USERNAME}
                        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                        name={"Subcontractor"}
                        update={fetchData}
                    />
                    <div className="myscreen p-3">
                        <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                            {resStatus === "success" && !isModalOpen && (
                                <DataGrid
                                    rows={taskData}
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
                                    getRowId={(row) => row._id}
                                    slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                                />
                            )}
                            {resStatus === "error" && (
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
                                                    onClick={fetchData}
                                                    className="btn btn-sm btn-secondary"
                                                >
                                                    Retry
                                                </button>
                                            </center>
                                        </small>
                                    </div>
                                </Box>
                            )}
                        </Box>
                    </div>
                </>
            ) : (
                <SubGallery taskId={selectedTaskId} />
            )}
        </Box>
    );
};

export default TaskSpliting;
