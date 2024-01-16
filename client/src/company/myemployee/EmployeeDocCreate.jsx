// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { Button, Container } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
// import { ToastContainer, toast } from "react-toastify";
// import Dropzone from "react-dropzone";
// import "react-toastify/dist/ReactToastify.css";

// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "90%", // Updated width for better responsiveness
//     maxWidth: "600px", // Added maxWidth for larger screens
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 4
// };

// const EmployeeDocCreate = ({EMPLOYEE_ID, COMPANY_USERNAME, update,EMPLOYEE_USERNAME}) => {
//     const [open, setOpen] = useState(false);
//     const [file, setFile] = useState([]);

//     const [formData, setFormData] = useState({
//         selectedFile: null,
//         DOCUMENT_EXPIRY_DATE: "",
//         DOCUMENT_TYPE: ""
//     });
//     const [backdrop, setBackdrop] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleOpen = () => setOpen(true);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setOpen(false);
//         setBackdrop(true);
//         if (isSubmitting) {
//             return;
//         }

//         setIsSubmitting(true);

//         if (!file || !formData.DOCUMENT_EXPIRY_DATE) {
//             setIsSubmitting(false);
//             toast.error("Please select a file and enter an expiry date.");
//             return;
//         }

//         const data = new FormData();
//         data.append("file", file);
//         data.append("DOCUMENT_REF_ID", EMPLOYEE_ID);
//         data.append("DOCUMENT_EMPLOYEE_USERNAME", EMPLOYEE_USERNAME);
//         data.append("DOCUMENT_PARENT_USERNAME", COMPANY_USERNAME);
//         data.append("DOCUMENT_EXPIRY_DATE", formData.DOCUMENT_EXPIRY_DATE);
//         data.append("DOCUMENT_TYPE", formData.DOCUMENT_TYPE);

//         try {
//             const response = await axios.post("/api/create_employee_document", data);
//             if (response.data.operation === "successfull") {
//                 setOpen(false);
//                 toast.success("Document uploaded successfully!", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 1000
//                 });
//                 update();
//                 setFile(file ? file.name : "");
//                 setFormData("");
//             } else {
//                 toast.error("Failed to upload document.");
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("An error occurred while uploading the document.");
//         } finally {
//             setIsSubmitting(false);
//             setBackdrop(false);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setFormData({
//             selectedFile: null,
//             DOCUMENT_EXPIRY_DATE: "",
//             DOCUMENT_TYPE: ""
//         });
//     };


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     return (
//         <>
//             <Button
//                 onClick={handleOpen}
//                 sx={{ color: "#277099" }}
//                 className="btn rounded-0 border-0 rounded-0 text-light"
//                 variant="contained"
//                 size="small"
//             >
//                 + Add New Document
//             </Button>

//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//                 // className="modalWidth"
//                 style={{ zIndex: 9999999, }}
//             >
//                 <>
//                     {/* <Box sx={{ ...style, width: "90%", maxWidth: "500px", margin:"0 auto", border:"1px solid red", position:"absolute" }}> */}
//                     <Box sx={{
//                         ...style,
//                         width: "100%",
//                         maxWidth: "500px",
//                         margin: "0 auto",
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                     }}>
//                         <div className="container">
//                             <form onSubmit={handleSubmit}>
//                                 <Dropzone onDrop={(acceptedFiles) => setFile(...acceptedFiles)}>
//                                     {({ getRootProps, getInputProps }) => (
//                                         <section
//                                             className="p-4 rounded-2"
//                                             style={{
//                                                 background: "#f2f2f2",
//                                                 border: "2px dashed gray"
//                                             }}
//                                             {...getRootProps()}
//                                         >
//                                             <div>
//                                                 <input {...getInputProps()} />
//                                                 <p>
//                                                     Drag 'n' drop some files here, or click to select
//                                                     files
//                                                 </p>
//                                             </div>
//                                         </section>
//                                     )}
//                                 </Dropzone>
//                                 {file.name && (
//                                     <p className="text-success fs-7 fz-2 pt-2">
//                                         Selected File: {file?.name}
//                                     </p>
//                                 )}

//                                 <div className="row mb-2">
//                                     <div className="form-group col-xl-12">
//                                         <label className="pb-2 fs-6 rounded p-2">
//                                             Select Expiry Date
//                                         </label>
//                                         <input
//                                             type="date"
//                                             className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
//                                             id="DOCUMENT_EXPIRY_DATE"
//                                             name="DOCUMENT_EXPIRY_DATE"
//                                             onChange={handleInputChange}
//                                             value={formData.DOCUMENT_EXPIRY_DATE}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="row mb-2">
//                                     <div className="form-group col-xl-12">
//                                         <label className="pb-2 fs-6 rounded ">Select Document Type</label>
//                                         <input
//                                             type="text"
//                                             className="form-control mb-2 pb-2 pt-2 form-control-2 rounded-0"
//                                             id="DOCUMENT_TYPE"
//                                             name="DOCUMENT_TYPE"
//                                             onChange={handleInputChange}
//                                             value={formData.DOCUMENT_TYPE}
//                                             placeholder="Additional Field"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="row m-2">
//                                     <div className="form-group col-8 ">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-info text-white"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? "Uploading..." : "Upload document"}
//                                             <ArrowCircleUpIcon fontSize="small" className="ml-2" />
//                                         </button>{" "}
//                                     </div>
//                                     <div className="form-group col-4 ">
//                                         <button
//                                             onClick={handleClose}
//                                             className="btn btn-danger text-white pl-3 pr-3"
//                                         >
//                                             Close
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </Box>
//                 </>
//             </Modal >
//             <ToastContainer position="top-center" autoClose={1000} />
//         </>
//     );
// };

// export default EmployeeDocCreate;
