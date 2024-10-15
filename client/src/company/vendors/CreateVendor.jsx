
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import country from "../../Api/countriess.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectList from "../../jsonlist/typeOfProject.json";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../../components/MultiStepForm";

const CreateVendor = () => {

    const companyData = useSelector(prev => prev.companyLogin.user)
    const COMPANY_ID = companyData[0];
    const COMPANY_USERNAME = companyData[1];
    const COMPANY_PARENT_ID = companyData[2];
    const COMPANY_PARENT_USERNAME = companyData[3];
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        <>
            <button
                size="small"
                variant={"outlined"}
                className={"btn button border-bottom-0 bg-white btn-sm"}
            >
                All Vendors
            </button>
            <button
                onClick={handleOpen}
                sx={{ color: "#277099" }}
                className="btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"
                // variant="contained"
                size="small"
            >
                + Add New Vendor
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ zIndex: 9999999 }}
            >
                <Box className="modal-content">
                    <h5>Create Vendor</h5>
                    <MultiStepForm
                        steps={steps}
                        modalState={()=>setOpen()}
                        validateStep={validateStep}
                        onSubmit={handleSubmit}
                        buttonLabels={{
                          next: 'Next',
                          cancel: 'Cancel',
                            back: 'Previous',
                            save: 'Save Vendor'
                        }}
                    />

                </Box>
            </Modal>

        </>
    )
}

export default CreateVendor