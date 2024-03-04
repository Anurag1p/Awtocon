import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProjectTaskGallery = ({ filteredTasks, taskId, COMPANY_PARENT_USERNAME }) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const TASK_IMAGE_PROJECT_ID = filteredTasks[0].TASK_PROJECT_ID
    console.log(selectedImage, "selectedImage")
    const TASK_IMAGE_MEMBER_PARENT_USERNAME = COMPANY_PARENT_USERNAME[0].SUBCONTRACTOR_MEMBER_PARENT_USERNAME
    // Fetch all the images .....

    const fetchAllTaskImages = async () => {
        try {
            const response = await axios.put("/api/get_indiviual_task_images", {
                TASK_IMAGE_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
                TASK_IMAGE_TASK_ID: taskId?.row?.TASK_ID,
                TASK_IMAGE_PROJECT_ID: TASK_IMAGE_PROJECT_ID,

            }).then((res) => {
                console.log(res.data.result, "result")
                setSelectedImage(res.data.result)
            })
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fetchAllTaskImages();
    }, [""])


    return (
        <>
            <div className="container-fluid mt-2">

                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Link color="inherit" href="/company/projects/tasks" className='cursor-pointer text-decoration-none'>
                        Back
                    </Link>
                    <Typography className='text-primary'>Gallery</Typography>
                </Breadcrumbs>


                <div>

                    {/* <h2 className='btn btn-primary m-3'>Images <span className='badge badge-light'>{images.length}</span></h2> */}

                </div>
                <div className="gallery d-flex flex-wrap mt-2">
                    {selectedImage?.map((imageArray, index) => (
                        <div key={index} className="image-array ml-2 position-relative">
                            {imageArray?.TASK_APPROVE_FOR_CONTRACTOR ? <img src={imageArray?.imageUrls} alt={`Image ${index}`} className='galleryImage border-3 border-success ' /> : <img src={imageArray.imageUrls} alt={`Image ${index}`} className='galleryImage border-3 border-danger' />}
                        </div>
                    ))}
                </div>



                {/*
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Image Details</DialogTitle>
                    <DialogContent>
                        {selectedImage && (
                            <div>
                                <img src={selectedImage?.imageUrls} alt="Selected Image" style={{ maxWidth: '100%' }} className='border border-danger' />
                                <p>{selectedImage?.description}</p>
                                <p>Here is the Image Description.....</p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog> */}


            </div>

        </>
    )
}

export default ProjectTaskGallery