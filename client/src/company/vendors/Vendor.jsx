import React, { useState } from 'react';

const MultiStepVendorForm = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorAddress: '',
    contactDetails: '',
    country: '',
    state: '',
    city: '',
    bankDetails: ''
  });

  // Form validation for the first step
  const validateStep1 = () => {
    if (!formData.vendorName || !formData.vendorEmail) {
      alert('Vendor name and email are required');
      return false;
    }
    return true;
  };

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Proceed to the next step
  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  // Go back to the previous step
  const handleBack = () => setStep(step - 1);

  // Handle form submission (saving)
  const handleSave = () => {
    // You can make an API call here to save the form data
    alert('Form saved successfully');
    console.log(formData);
  };

  return (
    <div className="multi-step-form">
      <h2>Create Vendor</h2>
      {step === 1 && (
        <div>
          <div>
            <label>Vendor Name</label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Vendor Email</label>
            <input
              type="email"
              name="vendorEmail"
              value={formData.vendorEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button onClick={() => setStep(1)}>Cancel</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div>
            <label>Vendor Address</label>
            <input
              type="text"
              name="vendorAddress"
              value={formData.vendorAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Contact Details</label>
            <input
              type="text"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div>
            <label>Bank Details</label>
            <input
              type="text"
              name="bankDetails"
              value={formData.bankDetails}
              onChange={handleChange}
            />
          </div>
          <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepVendorForm;
