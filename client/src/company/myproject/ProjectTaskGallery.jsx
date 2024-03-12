import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlakyIcon from '@mui/icons-material/Flaky'; // Import the Flaky icon from Material-UI Icons
import { setTaskImgApprove, TaskImageApproveSlice, SetTaskImageApprove } from "../../redux/slice/TaskImageApproveSlice"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const ProjectTaskGallery = ({ filteredTasks, taskId, COMPANY_PARENT_USERNAME, setIsModalOpen }) => {
    const [dialogOpen, setDialogOpen] = useState({
        dialog: false,
        dialog_approve_btn: false,
        dialog_decline_btn: false
    });
    // const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    console.log(selectedImage, "selecttedImage")
    const [images, setImages] = useState([]);

    console.log(images, "hellord word")
    const [approve, setApprove] = useState({ comment: "", isApproved: false, });
    const TASK_IMAGE_PROJECT_ID = filteredTasks[0]?.TASK_PROJECT_ID;
    const TASK_IMAGE_MEMBER_PARENT_USERNAME = COMPANY_PARENT_USERNAME?.[0]?.SUBCONTRACTOR_MEMBER_PARENT_USERNAME;
    console.log(approve, "approve")
    const { comment, isApproved } = approve
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    //fetch all task images Approvals from redux 

    const taskImgApprovals = useSelector(state => state?.taskImgApprove?.taskImg);
    console.log(taskImgApprovals, "taskimagApprovals")

    // Fetch all the images
    const fetchAllTaskImages = async () => {
        try {
            const response = await axios.put("/api/get_indiviual_task_images", {
                TASK_IMAGE_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
                TASK_IMAGE_TASK_ID: taskId?.row?.TASK_ID,
                TASK_IMAGE_PROJECT_ID: TASK_IMAGE_PROJECT_ID,
            });
            setImages(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllTaskImages();
    }, [approve]); // Fetch images only once on component mount

    const handleImageClick = (image) => {
        setSelectedImage(image);
        if (image.TASK_APPROVE_FOR_CONTRACTOR) {
            setDialogOpen((prev) => {
                return { ...prev, dialog: true, dialog_approve_btn: false, dialog_decline_btn: false }
            });

        } else {
            setDialogOpen((prev) => {
                return { ...prev, dialog: true, dialog_approve_btn: false, dialog_decline_btn: false }
            });

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApprove((approve) => ({
            ...approve,
            [name]: value,
        }));
    };

    const handleApprove = () => {
        console.log(approve, "approve")
        dispatch(SetTaskImageApprove({
            TASK_IMAGE_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
            TASK_IMAGE_SITE_UPLOAD_ID: selectedImage?.TASK_IMAGE_SITE_UPLOAD_ID,
            TASK_COMMENT: approve?.comment

        }))
        setApprove({
            ...approve,
            comment: "",
            isApproved: true
        });
        setDialogOpen({
            dialog: true,
            dialog_approve_btn: true,
            dialog_decline_btn: false
        });
        // dispatch(setErrorMessage(""))

    }


    const handleDecline = () => {

        dispatch(SetTaskImageApprove({
            TASK_IMAGE_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
            TASK_IMAGE_SITE_UPLOAD_ID: selectedImage?.TASK_IMAGE_SITE_UPLOAD_ID,
            TASK_COMMENT: approve?.comment
        }));
        setApprove({
            ...approve,
            comment: "",
            isApproved: false
        });
        setDialogOpen({
            dialog: true,
            dialog_approve_btn: false,
            dialog_decline_btn: true
        });
        // dispatch(setErrorMessage(""))
    };
    return (
        <div className="container-fluid mt-2">
            <Breadcrumbs aria-label="breadcrumb" separator="›" >
                <Link color="inherit" className='cursor-pointer text-decoration-none' onClick={() => setIsModalOpen(false)}>
                    Back
                </Link>
                <Typography className='text-primary'>Gallery</Typography>
            </Breadcrumbs>

            <div className="gallery d-flex flex-wrap mt-2 border ">
                {images?.map((imageArray, index) => (
                    <div key={index} className="image-array ml-2 position-relative">
                        {imageArray?.TASK_APPROVE_FOR_CONTRACTOR ? <img src={imageArray?.imageUrls} alt={`Image ${index}`} className='galleryImage border-3 border-success ' /> : <img src={imageArray.imageUrls} alt={`Image ${index}`} className='galleryImage border-3 border-danger' />}
                        <div className="details-overlay-top-right">
                            <FlakyIcon color='primary' fontSize="large" onClick={() => handleImageClick(imageArray)} />
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={dialogOpen.dialog} onClose={() => setDialogOpen({
                dialog: false,
                dialog_approve_btn: true,
                dialog_decline_btn: true
            })} className='position-relative'>
                <DialogTitle>Image Verification</DialogTitle>
                <Button onClick={() => setDialogOpen(false)} className='position-absolute top-0 end-0 text-danger fs-5 '>X</Button>
                <DialogContent >
                    {selectedImage && (
                        <div className='d-flex flex-column w-100'>
                            <img src={selectedImage?.imageUrls} alt="Selected Image" style={{ maxWidth: '100%', minWidth: '500px', height: "250px", objectFit: "fill", objectPosition: "center" }} className='mb-2' />
                            <label className='fs-5'>Comment </label>
                            <textarea type="text" name="comment" id="comment" className='p-2 shadow-textarea' placeholder='Please write your comment here .....' value={comment} onChange={handleChange} />

                            <span className='text-center text-success'>{errorMessage}</span>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className='d-flex justify-content-between'>

                    <div className="button-groups m-3">
                        <Button className="accept ml-2" variant='contained' disabled={dialogOpen.dialog_approve_btn} color='success' sx={{ mr: { xs: 1, sm: 2 } }} onClick={(e) => handleApprove(e.selectedImage)}>Approve</Button>
                        <Button className="decline" variant='contained' disabled={dialogOpen.dialog_decline_btn} color='error' sx={{ mr: { xs: 1, sm: 2 } }} onClick={(e) => handleDecline(e.selectedImage)}>Decline</Button>
                    </div>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProjectTaskGallery;
