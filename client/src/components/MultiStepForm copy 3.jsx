import React, { useState } from 'react';
import '../assests/css/MultiStepForm.css';

const MultiStepForm = ({
    steps,              // Array of step objects with fields
    onSubmit,           // Function to handle final form submission
    validateStep,       // Function to validate each step (optional)
    buttonLabels = {    // Custom button labels (optional)
        cancel: 'Cancel',
        next: 'Next',
        back: 'Back',
        save: 'Save'
    },
    modalState
}) => {
    const [step, setStep] = useState(0); // Track the current step
    const [formData, setFormData] = useState({}); // Track form data
    const [slideDirection, setSlideDirection] = useState(''); // Track slide direction for animation
    const [showSuccess, setShowSuccess] = useState(false);
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Proceed to the next step with slide animation
    const handleNext = () => {
        if (validateStep && !validateStep(step, formData)) return;
        setSlideDirection('slide-in-left');
        setTimeout(() => {
            setStep(step + 1);
            setSlideDirection('');
        }, 300); // Match animation duration
    };

    // Go back to the previous step with slide animation
    const handleBack = () => {
        setSlideDirection('slide-in-right');
        setTimeout(() => {
            setStep(step - 1);
            setSlideDirection('');
        }, 300); // Match animation duration
    };

    const handleSave = () => {
        onSubmit(formData);
        setShowSuccess(true); // Show success message
        setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
    };

    return (
        <div className="multi-step-form-modal">
            <div className={`multi-step-form ${slideDirection}`}>
                <h2>{steps[step].title}</h2>
                <div className="form-fields-container">
                    {steps[step].fields.map((field, index) => (
                        <div key={index} className="form-field">
                            <label>{field.label}</label>
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                            />
                        </div>
                    ))}
                </div>

                <div className="button-group">
                    {step === 0 ? (
                        <>
                            <button className="cancel-button" onClick={() => modalState(false)}>
                                {buttonLabels.cancel}
                            </button>
                            <button className="next-button" onClick={handleNext}>
                                {buttonLabels.next}
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="back-button" onClick={handleBack}>
                                {buttonLabels.back}
                            </button>
                            {step < steps.length - 1 ? (
                                <button className="next-button" onClick={handleNext}>
                                    {buttonLabels.next}
                                </button>
                            ) : (
                                <button className="save-button" onClick={handleSave}>
                                    {buttonLabels.save}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {showSuccess && <div className="success-msg">Form submitted successfully!</div>}
        </div>
    );
};

export default MultiStepForm;
