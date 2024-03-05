import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import React, { useState } from 'react'
import ProjectNav from './ProjectNav'
import { useLocation, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { DataGrid } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '../../components/CustomNoRowsOverlay';
import SubGallery from '../../subcontractorPanel/assignedProject/SubGallery';
import ProjectTaskGallery from './ProjectTaskGallery';
import Animations from '../../components/Animations';


// mui multiple select tag style start....
const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
// end .....

const Tasks = () => {

    const filteredProject = useLocation();
    const filterData = filteredProject?.state[0]
    const COMPANY_ID = filteredProject?.state[1]
    const COMPANY_USERNAME = filteredProject?.state[2]
    const COMPANY_PARENT_ID = filteredProject?.state[3]
    const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
    const assignSubContractor = filterData?.SUB_PROJECT_ASSIGN
    const [selectedSubcontractorId, setSelectedSubcontractorId] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [resStatus, setResstatus] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log("1 :=>", COMPANY_PARENT_USERNAME)
    // Extracting unique subcontractor IDs from the data
    const subcontractorIds = [...new Set(assignSubContractor.map(item => item.SUBCONTRACTOR_ID))];
    console.log(subcontractorIds, "subcontractorIds")
    const defaultSelectedSubcontractorId = subcontractorIds[0];
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    // Function to handle subcontractor selection
    const handleSubcontractorChange = (e) => {
        const selectedId = e.target.value;
        setSelectedSubcontractorId(selectedId);
        // Filtering tasks based on selected subcontractor ID
        const tasks = assignSubContractor.find(item => item.SUBCONTRACTOR_ID === selectedId)?.SUBCONTRACTOR_TASK || [];

        setFilteredTasks(tasks);
        setSelectedTaskId(false)
    };

    const handleDetailButtonClick = (taskId) => {
        setIsModalOpen(true);
        setSelectedTaskId(taskId); // Store the selected task id
    };


    const columns = [
        { field: 'TASK_ID', headerName: ' Task Id', width: 90 },
        {
            field: 'TASK_NAME',
            headerName: 'Task Name',
            width: 150,

        },
        {
            field: 'SUBCONTRACTOR_NAME',
            headerName: 'Subcontractor Name',
            width: 150,

        },
        {
            field: 'TASK_START_DATE',
            headerName: 'Task Start Date',
            width: 150,

        },
        {
            field: 'TASK_END_DATE',
            headerName: 'Task Start Date',
            type: 'number',
            width: 110,

        },
        {
            field: 'TASK_DESCRIPTION',
            headerName: 'Task description',
            description: 'Task description',
            sortable: false,
            width: 160,

        },
        {
            field: 'TASK_VALUE',
            headerName: 'Task Value',
            sortable: false,
            width: 160,

        },
        {
            field: 'TASK_VALUE',
            headerName: 'Task Value',
            sortable: false,
            width: 160,

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
                            handleDetailButtonClick(cellValues);
                        }}
                    >
                        view
                    </Button>
                );
            },
        },
    ];

    const rows = filteredTasks;

    return (
        <>
            <Box
                style={{
                    display: "block",
                    height: "100vh",
                }}
                className="box position-absolute"
            >
                <ProjectNav filterData={filterData} active={6} COMPANY_ID={COMPANY_ID} COMPANY_USERNAME={COMPANY_USERNAME} COMPANY_PARENT_ID={COMPANY_PARENT_ID} COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME} />
                {!isModalOpen ? (
                    <div className="myscreen p-3 d-flex flex-column justify-content-space-around ">
                        <Accordion
                            className="container-fluid mt-2"
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                className="container-fluid text-capitalize text-primary"
                            >
                                <PanToolAltIcon color='#198754' />  <p style={{ fontSize: "15px", margin: "5px", color: "#198754" }}> Click here for more task details</p>
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

                        <FormControl sx={{ width: "300px", margin: "20px 0", height: "7%" }}>
                            <InputLabel id="demo-simple-select-label" variant="standard" sx={{ marginLeft: "5px" }} >Select Subcontractor</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSubcontractorId || defaultSelectedSubcontractorId}
                                label="Select Subcontractor"
                                onChange={handleSubcontractorChange}
                                MenuProps={MenuProps}
                                sx={{ height: "100%" }}
                            >
                                {subcontractorIds.map(id => (
                                    <MenuItem key={id} value={id}>{assignSubContractor.filter(e => e.SUBCONTRACTOR_ID === id)[0]?.SUBCONTRACTOR_NAME || "NOT FOUND"} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {resStatus ? (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row?.TASK_PROJECT_ID}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                slots={{
                                    noRowsOverlay: CustomNoRowsOverlay,
                                }}
                                disableRowSelectionOnClick
                                density="compact"
                            />
                        ) : (<Animations/>)}

                    </div>

                ) : (
                    <ProjectTaskGallery
                        taskId={selectedTaskId}
                        filteredTasks={filteredTasks}
                        filteredProject={filteredProject}
                        COMPANY_PARENT_USERNAME={assignSubContractor}
                    />
                )}
            </Box>
        </>
    )
}

export default Tasks