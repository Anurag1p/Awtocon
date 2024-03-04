import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import country from "../../jsonlist/countriess.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import env from "react-dotenv";

import { Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};

export default function CreateTask({ update }) {

    const filteredProject = useLocation();
    console.log(filteredProject?.state[0].PROJECT_PARENT_ID, "PROJECT_PARENT_ID")
    console.log(filteredProject?.state[0].PROJECT_PARENT_USERNAME, "PROJECT_PARENT_USERNAME")

    console.log(filteredProject, "uselocation")
    const filterData = filteredProject?.state[0]
    const COMPANY_ID = filteredProject?.state[0]?.PROJECT_PARENT_ID
    const COMPANY_USERNAME = filteredProject?.state[0]?.PROJECT_PARENT_USERNAME
    const PROJECT_ID = filteredProject?.state[0]?.PROJECT_ID;
    const SUBCONTRCATOR_ID = filteredProject?.state[1]
    const SUBCONTRCATOR_USERNAME = filteredProject?.state[2]
    const COMPANY_PARENT_ID = filteredProject?.state[3]
    const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
    const [taskNameError, setTaskNameError] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createTask, setCreateTask] = useState({
        TASK_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
        TASK_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
        TASK_PARENT_ID: COMPANY_ID,
        TASK_PARENT_USERNAME: COMPANY_USERNAME,
        TASK_PROJECT_ID: PROJECT_ID,
        TASK_SUBCONTRACTOR_ID: SUBCONTRCATOR_ID,
        TASK_NAME: "",
        TASK_VALUE: "",
        TASK_START_DATE: "",
        TASK_END_DATE: "",
        TASK_PROJECT_LEAD: "",
        TASK_DESCRIPTION: "",
        TASK_COMMENT: "",
        TASK_ADVANCE_AMOUNT: "",
        TASK_REMAINING_AMOUNT: "",
    });

    const handleCreate = (e) => {
        const { name, value } = e.target;
        setCreateTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "TASK_NAME") {
            setTaskNameError(""); // Clear error message
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (createTask.TASK_NAME.trim() === "") {
            setTaskNameError("Task name is required....");
            return; // Stop form submission if task name is empty
        }

        try {
            const response = await axios.post("/api/create_task", createTask).then((res) => res.data.result);
            toast.success("Task Created Successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            setOpen(false);
            update();
        } catch (error) {
            console.log(error)
            toast.error(`${error}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
        }

    }

    return (
        <>

            <Button
                onClick={handleOpen}
                style={{ color: "#277099" }}
                className="btn rounded-0 border-0  rounded-0 text-light btn-sm m-2"
                variant="contained"
                size="small"
            >
                + Create Tasks
            </Button>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ zIndex: 9999999 }}
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <div className="row py-2">
                            <div className="form-group col-xl-4">
                                <label>Task Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-2 rounded-0"
                                    placeholder="Enter task name..."
                                    value={createTask.TASK_NAME}
                                    name="TASK_NAME"
                                    id="TASK_NAME"
                                    onChange={handleCreate}
                                />
                                {taskNameError && <div > <p className="text-danger mt-1 ">{taskNameError}</p> </div>}
                            </div>
                            <div className="form-group col-xl-4">
                                <label>Task Start Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_START_DATE"
                                    placeholder="select start date"
                                    value={createTask.TASK_START_DATE}
                                    name="TASK_START_DATE"
                                    onChange={handleCreate}
                                />

                            </div>
                            <div className="form-group col-xl-4">
                                <label>Task End Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_END_DATE"
                                    placeholder="Enter End Date"
                                    name="TASK_END_DATE"
                                    value={createTask.TASK_END_DATE}
                                    onChange={handleCreate}
                                />

                            </div>
                        </div>


                        <div className="row py-2">
                            <div className="form-group  col-md-6">
                                <label>Task Description <span style={{ color: "tan" }}>Optional</span></label>
                                <textarea
                                    type="text"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_DESCRIPTION"
                                    placeholder="Enter somthing about your project..."
                                    name="TASK_DESCRIPTION"
                                    value={createTask.TASK_DESCRIPTION}
                                    onChange={handleCreate}
                                />
                            </div>

                            <div className="form-group col-xl-3">
                                <label>Task Value</label>
                                <input
                                    type="number"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_VALUE"
                                    placeholder="Enter task value"
                                    name="TASK_VALUE"
                                    value={createTask.TASK_VALUE}
                                    onChange={handleCreate}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Task Project Lead</label>
                                <input
                                    type="text"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_PROJECT_LEAD"
                                    name="TASK_PROJECT_LEAD"
                                    value={createTask.TASK_PROJECT_LEAD}
                                    onChange={handleCreate}
                                />
                            </div>
                        </div>


                        <div className="row py-2">
                            <div className="form-group col-xl-6">
                                <label>Task Advance Payment</label>
                                <input
                                    type="number"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_ADVANCE_AMOUNT"
                                    placeholder="Enter advance amount"
                                    name="TASK_ADVANCE_AMOUNT"
                                    value={createTask.TASK_ADVANCE_AMOUNT}
                                    onChange={handleCreate}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Task Remaining Payment</label>
                                <input
                                    type="number"
                                    className="form-control form-control-2 rounded-0 "
                                    id="TASK_REMAINING_AMOUNT"
                                    placeholder="Enter remaining amount"
                                    name="TASK_REMAINING_AMOUNT"
                                    value={createTask.TASK_REMAINING_AMOUNT}
                                    onChange={handleCreate}
                                />
                            </div>
                        </div>


                        <div className="FormButtonAlign">
                            <button
                                type="submit"
                                className="btn btn-info text-white"
                                onClick={handleSubmit}
                            >
                                Create Task
                            </button>{" "}
                            <button
                                onClick={handleClose}
                                className="btn btn-danger text-white"
                            >
                                Cancel
                            </button>
                        </div>


                    </form>
                </Box>
            </Modal>
        </>
    );
}
