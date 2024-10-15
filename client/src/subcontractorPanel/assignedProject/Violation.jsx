
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";
import moment from "moment-timezone";
import "../../assests/css/document.css";
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams } from "react-router-dom";

import {
    Paper,
} from "@mui/material";
import ExpiryReminder from "../../components/ExpiryStatus";


// doc create 
import Modal from "@mui/material/Modal";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Dropzone from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

// mui icons 
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Animation from "../../components/Animations";
import violation from "../../jsonlist/violation.json"
// import for redux setup 
import { useDispatch, useSelector } from "react-redux";
import { getAllDocuments, setDocument } from "../../redux/slice/GetCompanyDocSlice"
import SubProjectAssignNav from "./SubProjectAssignNav";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};


const Violation = (props) => {
    const { DOCUMENT_REF_ID,
        DOCUMENT_PARENT_USERNAME,
        DOCUMENT_ADMIN_USERNAME
    } = props
    const createEndpoint = "/api/create_permit_and_violation_document"
    const filteredProject = useLocation();
    console.log(filteredProject?.state[0].PROJECT_PARENT_ID, "PROJECT_PARENT_ID")
    console.log(filteredProject?.state[0].PROJECT_PARENT_USERNAME, "PROJECT_PARENT_USERNAME")

    console.log(filteredProject, "uselocation")
    const filterData = filteredProject?.state[0]
    const COMPANY_ID = filteredProject?.state[0]?.PROJECT_PARENT_ID
    const COMPANY_USERNAME = filteredProject?.state[0]?.PROJECT_PARENT_USERNAME
    const PROJECT_ID = filteredProject?.state[0]?.PROJECT_ID;
    console.log(PROJECT_ID, "MY project id")
    const SUBCONTRCATOR_ID = filteredProject?.state[1]
    const SUBCONTRCATOR_USERNAME = filteredProject?.state[2]
    const COMPANY_PARENT_ID = filteredProject?.state[3]
    const COMPANY_PARENT_USERNAME = filteredProject?.state[4]
    // const deleteApiEndpoint = "/api/delete_document"
    // const downloadApiEndpoint = "/api/download_document"

    // const documentData = useSelector(state => state?.companyDocuments?.documents);
    // console.log("companyDocs", documentData);
    const [documentData, setDocumentData] = useState([]);

    const dispatch = useDispatch();

    const [backdrop, setBackdrop] = useState(false);
    const [deleteItem, setDeleteItem] = useState("");
    const [resStatus, setResStatus] = useState(false); //adding newline
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const [formData, setFormData] = useState({
        selectedFile: null,
        DOCUMENT_EXPIRY_DATE: "",
        DOCUMENT_TYPE: "",
    });

    //getting the documents data from store
    // useEffect(() => {
    //     dispatch(getAllDocuments({
    //         DOCUMENT_REF_ID: DOCUMENT_REF_ID,
    //         DOCUMENT_PARENT_USERNAME: DOCUMENT_PARENT_USERNAME,
    //         DOCUMENT_ADMIN_USERNAME: DOCUMENT_ADMIN_USERNAME
    //     })).then(() => {
    //         setIsLoading(false); // Once data is fetched, set loading to false
    //     }).catch(() => {
    //         setIsLoading(false); // Handle error case as well
    //     });
    // }, [deleteItem])


    // function to download the file 
    // const downloadFile = (base64Data, fileName) => {
    //     const link = document.createElement("a");
    //     link.href = `data:application/octet-stream;base64,${base64Data}`;
    //     link.download = fileName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const MyScreen = styled(Paper)((props) => ({
        height: "calc(100vh - 32px)",
        padding: 0,
        paddingBottom: "0",
        overflow: "auto",
        borderRadius: 0,
        Border: 0,
        display: props.screenIndex ? "block" : "none",
    }));

    const handleClick = (event) => {
        handleOpen();
    };
    const handleOpen = () => setOpen(true);

    // Function to download the uploaded documents 
    // const handleDownload = async (documentId, fileName) => {
    //     // console.log(documentId, fileName, "filename")
    //     try {
    //         const data = {
    //             DOCUMENT_ID: documentId,
    //             DOCUMENT_ADMIN_USERNAME: DOCUMENT_ADMIN_USERNAME,
    //         };

    //         const config = {
    //             method: "put",
    //             maxBodyLength: Infinity,
    //             url: downloadApiEndpoint,
    //             data: data,
    //         };

    //         const response = await axios.request(config);
    //         downloadFile(response.data, fileName.name);


    //     } catch (error) {
    //         console.log(error);
    //     }

    // };


    // const handleDelDoc = async (e, documentId) => {
    //     // setBackdrop(true);
    //     setResStatus(true);
    //     console.log(documentId);

    //     const data = {
    //         DOCUMENT_ID: documentId,
    //         DOCUMENT_ADMIN_USERNAME: DOCUMENT_ADMIN_USERNAME,
    //     };
    //     console.log("Data found 1:", data);

    //     try {
    //         const response = await fetch(`${deleteApiEndpoint}/${documentId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         if (response.ok) {
    //             const jsonResponse = await response.json();
    //             setDeleteItem(jsonResponse);
    //             setResStatus(false);

    //             toast.success("Document Deleted successfully!", {
    //                 position: toast.POSITION.TOP_CENTER,
    //                 autoClose: 1000,
    //             });

    //         } else {
    //             // Handle the response for non-2xx status codes
    //             console.error(response.status, response.statusText);
    //             toast.error('Document not found!', {
    //                 // Show for 2 seconds
    //             });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('An error occurred while deleting the document.', {
    //             // Show for 2 seconds
    //         });
    //     }
    // };

    const formatSize = (bytes) => {
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else {
            return bytes + ' Bytes';
        }
    };


    const getFileIcon = (fileType) => {
        const fileTypeLowerCase = fileType.toLowerCase();
        if (fileTypeLowerCase.includes('pdf')) {
            return <DescriptionIcon color="error" />;
        } else if (fileTypeLowerCase.includes('excel') || fileTypeLowerCase.includes('spreadsheet')) {
            return <InsertChartIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('word') || fileTypeLowerCase.includes('document')) {
            return <AssignmentIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('jpeg') || fileTypeLowerCase.includes('jpg')) {
            return <InsertPhotoIcon color="primary" />;
        } else if (fileTypeLowerCase.includes('csv')) {
            return <InsertDriveFileIcon color="primary" />;
        } else {
            return <InsertDriveFileIcon color="disabled" />;
        }
    };

    const renderDocumentNameCell = (cellValues) => {
        const { name, fileType } = cellValues.value;
        const icon = getFileIcon(fileType);

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <span style={{ marginLeft: '8px' }}>{name}</span>
            </div>
        );
    };

    const columns = [
        { field: 'sr', headerName: 'S No.', width: 60 },
        {
            field: 'violationName',
            headerName: 'Violation Name',
            width: 180,
            renderCell: renderDocumentNameCell,
        },
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'documentSize',
            headerName: "Size",
            description: 'Document Size',
            width: 80,
            editable: false,
        },
        {
            field: 'uploadDate',
            headerName: 'Upload Date',
            type: 'number',
            width: 120,
            editable: false,

        },
        {
            field: 'documentExpDate',
            headerName: 'Expiry Date',
            description: 'Violation Expiry Date',
            width: 120,
            editable: false,
        },
        {
            field: 'documentIdType',
            headerName: 'violation Type',
            description: 'Violation Type',
            type: 'text',
            width: 120,
            editable: false,
            sortable: true,

        },

        // {
        //     field: 'ExpiryDateStatus',
        //     headerName: 'Expiry Status',
        //     description: 'Document Expiry',
        //     sortable: true,
        //     width: 180,
        //     editable: false,
        //     renderCell: (cellValues) => {

        //         return (<ExpiryReminder data={cellValues?.value} />)
        //     },
        //     size: "small"


        // },
        // {
        //     field: "download",
        //     headerName: "Download",
        //     width: 120,
        //     renderCell: (cellValues) => {
        //         return (
        //             <Button
        //                 variant="contained"
        //                 className="view-btn primary btn btn-success"
        //                 style={{ padding: "2px 8px" }}
        //                 onClick={(e) => {
        //                     handleDownload(cellValues.id, cellValues.row.documentName);
        //                 }}
        //             >
        //                 Download
        //             </Button>
        //         );
        //     },
        // },
        // {
        //     field: "delete",
        //     headerName: "Delete",
        //     width: 100,


        //     renderCell: (cellValues) => {
        //         return (
        //             <Button
        //                 variant="contained"
        //                 className="view-btn "
        //                 color="error"
        //                 style={{ padding: "2px 2px" }}
        //                 onClick={(e) => {
        //                     handleDelDoc(e, cellValues.id);
        //                 }}
        //             >
        //                 Delete
        //             </Button>
        //         );
        //     },
        // },
    ];

    // this is a new function using moment for date conversion 
    const formatDate = (dateString, withTimezone = false) => {
        const userTimeZone = moment.tz.guess();
        const date = moment(dateString).tz(userTimeZone);

        const formattedDate = withTimezone
            ? date.format("YYYY-MM-DD HH:mm:ss z") // Include time and timezone
            : date.format("YYYY-MM-DD"); // Date only

        return formattedDate;
    };

    // after new
    const rows = documentData?.map((item, index) => ({
        id: item.DOCUMENT_ID,
        sr: index + 1,
        violationName: {
            name: item.DOCUMENT_FILEDATA?.originalname || '',
            fileType: item.DOCUMENT_FILEDATA?.mimetype || '',
        },
        documentSize: formatSize(item.DOCUMENT_FILEDATA?.size) || '',
        uploadDate: formatDate(item.createdAt),
        documentType: item.DOCUMENT_FILEDATA?.mimetype || '',
        ExpiryDateStatus: formatDate(item.DOCUMENT_EXPIRY_DATE) || '',
        documentExpDate: formatDate(item.DOCUMENT_EXPIRY_DATE) || '',
        documentIdType: item.DOCUMENT_TYPE || '',
    })) || [];


    // for create document 

    const [file, setFile] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(false);
        setBackdrop(true);

        if (isSubmitting) {
            return; // Prevent multiple submissions
        }

        setIsSubmitting(true);

        if (!file || !formData.DOCUMENT_EXPIRY_DATE) {
            setIsSubmitting(false);
            toast.error("Please select a file and enter an expiry date.");
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(formData.DOCUMENT_EXPIRY_DATE);

        if (selectedDate <= currentDate) {
            setIsSubmitting(false);
            toast.error("Expiry date must be greater than the document upload date.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return;
        }

        const data = new FormData();
        data.append("file", file);
        data.append("DOCUMENT_REF_ID", DOCUMENT_REF_ID);
        data.append("DOCUMENT_ADMIN_USERNAME", DOCUMENT_ADMIN_USERNAME);
        data.append("DOCUMENT_PARENT_USERNAME", DOCUMENT_PARENT_USERNAME);

        data.append("DOCUMENT_SUBCONTRACTOR_ID", DOCUMENT_PARENT_USERNAME);
        data.append("DOCUMENT_NAME", DOCUMENT_PARENT_USERNAME);
        data.append("DOCUMENT_PROJECT_ID", DOCUMENT_PARENT_USERNAME);
        data.append("DOCUMENT_ADMIN_ID", DOCUMENT_PARENT_USERNAME);
        data.append("DOCUMENT_PARENT_ID", DOCUMENT_PARENT_USERNAME);
        data.append("DOCUMENT_EXPIRY_DATE", formData.DOCUMENT_EXPIRY_DATE);
        data.append("DOCUMENT_TYPE", formData.DOCUMENT_TYPE);


        try {
            const response = await axios.post(createEndpoint, data);
            if (response.data.operation === "successfull") {
                setOpen(false);
                //   update();
                toast.success("Document uploaded successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
                setIsLoading(true);
                setFile(file ? file.name : "");
                setFormData({
                    selectedFile: null,
                    DOCUMENT_EXPIRY_DATE: "",
                    DOCUMENT_TYPE: "",
                });
                dispatch(setDocument(response.data.result));
            } else {
                toast.error("Failed to upload document.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while uploading the document.");
        } finally {
            setIsSubmitting(false);
            setBackdrop(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            selectedFile: null,
            DOCUMENT_EXPIRY_DATE: "",
            DOCUMENT_TYPE: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
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

    return (
        <>
            <Box
                style={{
                    display: "block",
                    height: "100vh",
                }}
                className="box position-absolute "
            >
                <SubProjectAssignNav
                    filterData={filterData}
                    active={2} COMPANY_ID={SUBCONTRCATOR_ID}
                    COMPANY_USERNAME={SUBCONTRCATOR_USERNAME}
                    COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                    COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />

                <Button
                    onClick={handleOpen}
                    sx={{ color: "#277099" }}
                    className="btn rounded-0 border-0 rounded-0 text-light m-2"
                    variant="contained"
                    size="small"
                >
                    + Add Violation
                </Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modalWidth"
                    style={{ zIndex: 9999999 }}
                >
                    <Container
                        id="content"
                        style={{ height: "100vh", position: "relative" }}
                        maxWidth="xl"
                    >
                        <Box sx={style}>
                            <div className="container">
                                <form onSubmit={handleSubmit}>
                                    <Dropzone onDrop={(acceptedFiles) => setFile(...acceptedFiles)}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section
                                                className="p-4 rounded-2"
                                                style={{
                                                    background: "#f2f2f2",
                                                    border: "2px dashed gray",
                                                }}
                                                {...getRootProps()}
                                            >
                                                <div>
                                                    <input {...getInputProps()} />
                                                    <p>
                                                        Drag 'n' drop some files here, or click to select
                                                        files
                                                    </p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    {file.name && (
                                        <p className="text-success fs-7 fz-2 pt-2">
                                            Selected File: {file?.name}
                                        </p>
                                    )}

                                    <div className="row mb-2">
                                        <div className="form-group col-xl-12">
                                            <label className="pb-2 fs-6 rounded p-2">
                                                Select Expiry Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
                                                id="DOCUMENT_EXPIRY_DATE"
                                                name="DOCUMENT_EXPIRY_DATE"
                                                onChange={handleInputChange}
                                                value={formData.DOCUMENT_EXPIRY_DATE}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="form-group col-xl-12">
                                            <label className="pb-2 fs-6 rounded p-2">
                                                Violation Type
                                            </label>
                                            <select
                                                className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
                                                onChange={handleInputChange}
                                                name="DOCUMENT_TYPE"
                                                id="DOCUMENT_TYPE"
                                                value={formData.DOCUMENT_TYPE}
                                                placeholder="Document Type"
                                                required
                                            >
                                                <option selected>--Choose Violation Type--</option>
                                                {violation.map((e, key) => {
                                                    return (
                                                        <option value={e} key={key}>
                                                            {e}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-8">
                                            <button
                                                type="submit"
                                                className="btn btn-info text-white"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Uploading..." : "Upload document"}
                                                <ArrowCircleUpIcon
                                                    fontSize="small"
                                                    className="ml-2"
                                                />
                                            </button>{" "}
                                        </div>
                                        <div className="form-group col-4">
                                            <button
                                                onClick={handleClose}
                                                className="btn btn-danger text-white pl-2 pr-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Box>
                        <ToastContainer position="top-center" autoClose={1000} />
                    </Container>
                </Modal>
                <MyScreen sx={{ display: "block", padding: 2 }}>
                    <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                        {isLoading ?
                            <Animation /> :
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
                                getRowId={(row) => row.id}
                            />
                        }
                    </Box>
                </MyScreen>
            </Box>
        </>
    )
}

export default Violation
