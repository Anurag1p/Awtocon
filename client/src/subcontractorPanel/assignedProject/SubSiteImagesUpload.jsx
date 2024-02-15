import React, { useState, useEffect } from 'react';
import "../../assests/css/upload.css";

const SubSiteImagesUpload = ({ maxLength, maxFileSize }) => {
    const [images, setImages] = useState([]);
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        // Calculate the width of the progress bar based on the number of uploaded images
        const percentage = (images.length / maxLength) * 100;
        setProgressWidth(percentage);
    }, [images, maxLength]);


    const handleImageUpload = (e) => {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Check if the file type is not an image
            if (!file.type.startsWith('image/')) {
                alert('You can only upload images. Please select an image file.');
                continue;
            }

            // Check if the file size exceeds the maximum allowed size
            if (file.size > maxFileSize) {
                alert(`File ${file.name} exceeds the maximum allowed size of ${maxFileSize / (1024 * 1024)} MB.`);
                continue;
            }

            if (images.length >= maxLength) {
                alert(`Maximum ${maxLength} images allowed.`);
                break;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prevImages => [...prevImages, { src: e.target.result, name: file.name, size: file.size }]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = (imageName) => {
        setImages(prevImages => prevImages.filter(img => img.name !== imageName));
    };

    const handleClearAll = () => {
        setImages([]);
    };

    const handleSubmitImages = () => {
        // Here you can implement the logic to submit the images to the server
        // For now, let's display an alert indicating that all images are successfully uploaded
        alert('All images are successfully uploaded!');
    };


    return (
        <>
            <div className="new-upload__box">
                <h5 className='text-black-50 mb-4'>Gallery</h5>

                <div className="new-upload__btn-box align-items-center d-flex ">
                    <label className="new-upload__btn custom-upload-btn">
                        <p className="custom-upload-text">Upload images</p>
                        <input type="file" multiple onChange={handleImageUpload} className="new-upload__inputfile" />
                    </label>

                    <div className="new-upload__counter ms-2">
                        <p className=" fw-bold fs-6 m-0">
                            {images.length} {images.length === 1 ? 'image' : 'images'} uploaded
                        </p>
                    </div>
                </div>

                {images.length > 0 ?
                    <>
                        <div className="new-upload__img-wrap gap-1 mb-5">
                            {images.map((image, index) => (
                                <div key={index} className="new-upload__img-box">
                                    <div style={{ backgroundImage: `url(${image.src})` }} className="new-img-bg">
                                        <div className="new-upload__img-close" onClick={() => handleImageRemove(image.name)}></div>
                                    </div>
                                    <p className="image-info">{image.name} ({(image.size / (1024 * 1024)).toFixed(2)} MB)</p>
                                </div>
                            ))}
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated p-2 progressincrease" style={{ width: `${progressWidth}%` }} role="progressbar" aria-valuenow={images.length} aria-valuemin="0" aria-valuemax={maxLength}>{images.length}%</div>
                        </div>
                        <button className="btn btn-danger mt-2 me-2" onClick={handleClearAll}>Clear All</button>
                        {images.length > 0 && (
                            <button className="btn btn-success mt-2" onClick={handleSubmitImages}>Submit Images</button>
                        )}
                    </>
                    : <h6 className='d-flex justify-content-center text-black-50'>Please upload site Progress images....</h6>}
            </div>
        </>



    );
};

export default SubSiteImagesUpload;
