import React, { useState } from 'react';
import '../assests/css/MultiStepForm.css';

const MultiStepForm = ({
    steps,
    onSubmit,
    validateStep,
    buttonLabels = {
        cancel: 'Cancel',
        next: 'Next',
        back: 'Back',
        save: 'Save'
    },
    modalState
}) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [slideDirection, setSlideDirection] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    // const handleNext = () => {
    //     if (validateStep && !validateStep(step, formData)) return;
    //     setSlideDirection('multiStep-slide-in-left');
    //     setTimeout(() => {
    //         setStep(step + 1);
    //         setSlideDirection('');
    //     }, 300);
    // };

    const handleNext = () => {
        let errors = {};

        // Add validation for Vendor Information
        if (step === 0) {
            if (!formData.vendorName) {
                errors.vendorName = 'Vendor name is required';
            }
            if (!formData.vendorEmail) {
                errors.vendorEmail = 'Vendor email is required';
            }
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors); // Set errors if validation fails
            return; // Stop proceeding to the next step
        }

        if (validateStep && !validateStep(step, formData)) return;

        setSlideDirection('multiStep-slide-in-left');
        setTimeout(() => {
            setStep(step + 1);
            setSlideDirection('');
        }, 300);
    };


    const handleBack = () => {
        setSlideDirection('multiStep-slide-in-right');
        setTimeout(() => {
            setStep(step - 1);
            setSlideDirection('');
        }, 300);
    };

    const handleSave = () => {
        onSubmit(formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className={`multiStep-form ${slideDirection}`}>
            <h2>{steps[step].title}</h2>
            <button class='multistep_cancel' onClick={() => modalState(false)}>x</button>
            <div className="multiStep-form-fields-container">
                {steps[step].fields.map((field, index) => (
                    <div key={index} className="multiStep-form-field">
                        <label>{field.label}</label>
                        <input
                            type={field.type || 'text'}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                        />

                        {validationErrors[field.name] && (
                            <div className="validation-error">{validationErrors[field.name]}</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="multiStep-button-group">
                {step === 0 ? (
                    <>
                        <button className="multiStep-cancel-button" onClick={() => modalState(false)}>
                            {buttonLabels.cancel}
                        </button>
                        <button className="multiStep-next-button" onClick={handleNext}>
                            {buttonLabels.next}
                        </button>
                    </>
                ) : (
                    <>
                        <button className="multiStep-back-button" onClick={handleBack}>
                            {buttonLabels.back}
                        </button>
                        {step < steps.length - 1 ? (
                            <button className="multiStep-next-button" onClick={handleNext}>
                                {buttonLabels.next}
                            </button>
                        ) : (
                            <button className="multiStep-save-button" onClick={handleSave}>
                                {buttonLabels.save}
                            </button>
                        )}
                    </>
                )}
            </div>
            {showSuccess && <div className="multiStep-success-msg">Form submitted successfully!</div>}
        </div>
    );
};

export default MultiStepForm;
