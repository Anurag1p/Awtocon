import React, { useState } from 'react';
import '../assests/css/modal.css'; // Import CSS file for styling

const Modal = ({ isOpen, onClose, fields, onSubmit }) => {
    const [formData, setFormData] = useState({});

    // Function to handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (

        isOpen && (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                    <span className="close-btn" onClick={onClose}>×</span>
                    <form onSubmit={handleSubmit}>

                        {fields.map((field, index) => (
                            <div key={index} className="form-group">
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                        <div className='btngroup d-flex '>
                        <button type="submit" className='modalSubmitbtn'>Submit</button>
                        <button type="submit" className='modalCancelbtn'>Cancel</button>
                        </div>
                       
                    </form>
                </div>
            </div>
        )
    );
};

export default Modal;
