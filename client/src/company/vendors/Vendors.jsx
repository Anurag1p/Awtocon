import React from 'react';
import MultiStepForm from './MultiStepForm';

const CreateVendorForm = () => {
  const steps = [
    {
      title: 'Vendor Information',
      fields: [
        { name: 'vendorName', label: 'Vendor Name', required: true },
        { name: 'vendorEmail', label: 'Vendor Email', required: true, type: 'email' }
      ]
    },
    {
      title: 'Address and Contact',
      fields: [
        { name: 'vendorAddress', label: 'Vendor Address' },
        { name: 'contactDetails', label: 'Contact Details' }
      ]
    },
    {
      title: 'Location',
      fields: [
        { name: 'country', label: 'Country' },
        { name: 'state', label: 'State' },
        { name: 'city', label: 'City' }
      ]
    },
    {
      title: 'Bank Details',
      fields: [
        { name: 'bankDetails', label: 'Bank Details' }
      ]
    }
  ];

  const validateStep = (step, formData) => {
    if (step === 0 && (!formData.vendorName || !formData.vendorEmail)) {
      alert('Vendor Name and Email are required');
      return false;
    }
    return true;
  };

  const handleSubmit = (formData) => {
    // Handle form submission here, e.g., send data to API
    console.log('Form submitted:', formData);
  };

  return (
    <MultiStepForm
      steps={steps}
      validateStep={validateStep}
      onSubmit={handleSubmit}
      buttonLabels={{
        cancel: 'Cancel',
        next: 'Next',
        back: 'Previous',
        save: 'Save Vendor'
      }}
    />
  );
};

export default CreateVendorForm;
