import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiPlus } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
    console.log(images, "setImages")
    console.log(firebaseimg, "images")
    console.log(firebaseimg, "firebaseimg")
    const [progressWidth, setProgressWidth] = useState(0);
    const createEndpoint = "/api/create_task_image";
    console.log(images.SITE_UPLOAD_NO, "site upload no")
    useEffect(() => {
        const percentage = (firebaseimg.length / maxLength) * 100;
        setProgressWidth(percentage);
    }, [firebaseimg, maxLength]);

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

    const handleDeleteImage = (index) => {
        const config = {
            data: {
                SUBCONTRACTOR_MEMBER_PARENT_USERNAME: TASK_IMAGE_MEMBER_PARENT_USERNAME,
                SITE_UPLOAD_NO: index
            }
        };

        axios.delete("/api/delete_site_image", config)
            .then((res) => {
                const result = res.data.result;
                console.log(result, "result");
                fetchData();
            })
            .catch((error) => {
                console.error("Error deleting image:", error);
            });
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
            {/* <div className='d-flex flex-wrap'>
                {images?.map((image, index) => (
                    <div key={index} className='flip-box m-2'>
                        <div className='flip-box-inner'>
                            <div className='flip-box-front'>
                                <img src={image?.imageUrls} alt={`Image ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "fill", }} />

                            </div>
                            <div className='flip-box-back'>
                                <h2>{image.description}</h2>
                            </div>
                            <div className="delete-overlay" onClick={() => handleDeleteImage(image.SITE_UPLOAD_NO)}>
                                <FontAwesomeIcon icon={faTrashAlt} className='delete-button' />
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}



<div className='d-flex flex-wrap'>
    {images?.map((image, index) => (
        <div key={index} className='position-relative m-2' style={{ position: 'relative' }}>
            <div className='flip-box'>
                <div className='flip-box-inner'>
                    <div className='flip-box-front'>
                        <img src={image?.imageUrls} alt={`image ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "fill" }} />
                    </div>
                    <div className='flip-box-back'>
                        <h2>{image.description}</h2>
                    </div>
                </div>
            </div>
            <div className="delete-overlay" style={{ position: 'absolute', bottom: '20px', left: '0' }} onClick={() => handleDeleteImage(image.SITE_UPLOAD_NO)}>
                <FontAwesomeIcon icon={faTrashAlt} className='delete-button' style={{ cursor: 'pointer' }} />
            </div>
            <div className="details-overlay" style={{ position: 'absolute', top: '0', right: '0' }} onClick={() => handleDeleteImage(image.SITE_UPLOAD_NO)}>
                <FontAwesomeIcon icon={faInfoCircle} className='details-button' style={{ cursor: 'pointer' }} />
            </div>
        </div>
        ))}
</div>




        </div>
    );
};

export default SubSiteImagesUpload;
