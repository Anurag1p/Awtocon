import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiPlus } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SubSiteImagesUpload = ({
    maxLength, maxFileSize,
    TASK_IMAGE_SUBCONTRACTOR_ID,
    TASK_IMAGE_PARENT_USERNAME,
    TASK_IMAGE_TASK_ID,
    TASK_IMAGE_PARENT_ID,
    TASK_IMAGE_MEMBER_PARENT_USERNAME,
    TASK_IMAGE_MEMBER_PARENT_ID,
    TASK_IMAGE_PROJECT_ID

}) => {
    console.log(TASK_IMAGE_TASK_ID, "TASK_IMAGE_TASK_ID")
    const [images, setImages] = useState([]);
    const [firebaseimg, setFirebase] = useState([]);
    const [progressWidth, setProgressWidth] = useState(0);
    const createEndpoint = "/api/create_task_image";
    const [selectedImage, setSelectedImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const percentage = (firebaseimg.length / maxLength) * 100;
        setProgressWidth(percentage);
    }, [firebaseimg, maxLength]);


    // handling images to upload 
    const handleImageUpload = (e) => {
        const files = e.target.files;
        console.log(files, "files=>e.target.value")
        setFirebase([...files]);
    };

    const handleSubmitImages = async () => {
        try {
            const storage = getStorage();
            const uploadedImageUrls = [];
            console.log(uploadedImageUrls, "uploadedImageUrls")

            for (let i = 0; i < firebaseimg.length; i++) {
                const file = firebaseimg[i];

                const storageRef = ref(storage, file.name);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                uploadedImageUrls.push(downloadURL);

            }

            const response = await axios.post(createEndpoint, {
                imageUrls: uploadedImageUrls,
                TASK_IMAGE_SUBCONTRACTOR_ID,
                TASK_IMAGE_PARENT_USERNAME,
                TASK_IMAGE_TASK_ID,
                TASK_IMAGE_PARENT_ID,
                TASK_IMAGE_MEMBER_PARENT_USERNAME,
                TASK_IMAGE_MEMBER_PARENT_ID,
                TASK_IMAGE_PROJECT_ID
            });

            setFirebase([]);
            console.log(response.data.result, 'All firebaseimg are successfully uploaded!');
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Error uploading firebaseimg. Please try again.');
        }
    };

    // fetching images data from mongo 
    const fetchData = async () => {
        try {
            const response = await axios.put('/api/get_all_task_images', {
                TASK_IMAGE_SUBCONTRACTOR_ID: TASK_IMAGE_SUBCONTRACTOR_ID,
                TASK_IMAGE_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
                TASK_IMAGE_PROJECT_ID: TASK_IMAGE_PROJECT_ID,
                TASK_IMAGE_TASK_ID: TASK_IMAGE_TASK_ID
            });
            setImages(response.data.result); // Assuming response.data is an array of arrays of image URLs

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchData()

        }, 800)
    }, [])


    // function for delete the images 
    const handleDeleteImage = (index) => {
        const config = {
            data: {
                TASK_IMAGE_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
                TASK_IMAGE_SITE_UPLOAD_ID: index
            }
        };

        axios.delete("/api/delete_task_image", config)
            .then((res) => {
                const result = res.data.result;
                console.log(result, "result");
                fetchData();
            })
            .catch((error) => {
                console.error("Error deleting image:", error);
            });
    };

    //function for oepn modal 
    const handleDetailsClick = (index) => {
        setSelectedImage(images[index]);
        setDialogOpen(true);
    };
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-muted border border-muted rounded p-2 mt-3">
                    <li className="breadcrumb-item active " aria-current="page">UPLOAD SITE PROGRESS IMAGES HERE</li>
                </ol>
            </nav>

            <label htmlFor="file-upload" className="custom-file-upload mt-3 mb-3">
                <FiPlus className='text-secondary' />
            </label>
            <input type="file" id="file-upload" multiple onChange={handleImageUpload} />
            <div className='d-flex'>
                {firebaseimg && firebaseimg?.map((image, index) => (
                    <div key={index} className='image-array d-flex flex-column'>
                        <img src={URL.createObjectURL(image)} alt={image.name} className='galleryImage' />

                    </div>
                ))}
            </div>
            {firebaseimg?.length > 0 && <button onClick={handleSubmitImages} className='btn btn-success mt-2 btn-sm'>Submit</button>}
            <hr />

            {/* showing uploaded images inmongo  */}

            <div>

                <h2 className='btn btn-primary m-3'>Images <span className='badge badge-light'>{images.length}</span></h2>

            </div>
            <div className="gallery d-flex flex-wrap">
                {images?.map((imageArray, index) => (
                    <div key={index} className="image-array ml-2 position-relative">
                        {imageArray?.TASK_APPROVE_FOR_CONTRACTOR ? <img src={imageArray?.imageUrls} alt={`Image ${index}`} className='galleryImage border-3 border-success ' /> : <img src={imageArray.imageUrls} alt={`Image ${index}`} className='galleryImage border-3 border-danger' />}
                        <div className="delete-overlay" onClick={() => handleDeleteImage(imageArray.TASK_IMAGE_SITE_UPLOAD_ID)}>
                            <FontAwesomeIcon icon={faTrashAlt} className='delete-button' />
                        </div>
                        <div className="details-overlay-top-right" onClick={() => handleDetailsClick(index)}>
                            <FontAwesomeIcon icon={faInfoCircle} className='details-button' />
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Image Details</DialogTitle>
                <DialogContent>
                    {selectedImage && (
                        <div>
                            <img src={selectedImage?.imageUrls} alt="Selected Image"  style={{ maxWidth: '100%', minWidth: '100%', height: "250px", objectFit: "fill", objectPosition: "center" }} className='mb-2' />
                           <span className='fw-bold text-primary mt-5'>Comment : </span> <p className='text-secondary mt-2'>{selectedImage?.TASK_COMMENT}</p>
                          
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default SubSiteImagesUpload;
