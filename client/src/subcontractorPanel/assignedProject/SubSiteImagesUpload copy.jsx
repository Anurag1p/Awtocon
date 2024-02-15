import React, { useState, useEffect } from 'react';
import "../../assests/css/upload.css";

const SubSiteImagesUpload = ({ maxLength }) => {
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

            if (!file.type.match('image.*')) {
                continue;
            }

            if (images.length >= maxLength) {
                alert(`Maximum ${maxLength} images allowed.`);
                break;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prevImages => [...prevImages, { src: e.target.result, name: file.name }]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = (imageName) => {
        setImages(prevImages => prevImages.filter(img => img.name !== imageName));
    };

    return (
        <>
            <div className="new-upload__box">
            <h5 className='text-black-50 mb-4'>Gallery</h5>

                <div className="new-upload__btn-box">
                    <label className="new-upload__btn">
                        <p style={{color:"white"}}> Upload images</p>
                        <input type="file" multiple onChange={handleImageUpload} className="new-upload__inputfile" />
                    </label>
                </div>
                {images.length > 0 ?
                    <>
                        <div className="new-upload__img-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="new-upload__img-box">
                                    <div style={{ backgroundImage: `url(${image.src})` }} className="new-img-bg">
                                        <div className="new-upload__img-close" onClick={() => handleImageRemove(image.name)}></div>
                                    </div>
                                </div>
                            ))

                            }
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated p-2 progressincrease" style={{ width: `${progressWidth}%` }} role="progressbar" aria-valuenow={images.length} aria-valuemin="0" aria-valuemax={maxLength}>{images.length}%</div>
                        </div>

                    </>
                    : <h6 className='d-flex justify-content-center text-black-50'>Please upload site Progress images....</h6>}
            </div>
        </>
    );
};

export default SubSiteImagesUpload;
