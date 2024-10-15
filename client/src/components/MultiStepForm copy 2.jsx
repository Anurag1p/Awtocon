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
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form is submitted

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Proceed to the next step
    const handleNext = () => {
        if (validateStep && !validateStep(step, formData)) return;
        setStep(step + 1);
    };

    // Go back to the previous step
    const handleBack = () => setStep(step - 1);

    // Handle final form submission
    const handleSave = () => {
        setIsSubmitted(true);
        onSubmit(formData);
    };

    return (
        <div className="multi-step-form">
            {isSubmitted ? (
                <div className="success-message">
                    Vendor successfully created!
                </div>
            ) : (
                <>
                    <h2>{steps[step].title}</h2>
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
                </>
            )}
        </div>
    );
};

export default MultiStepForm;
