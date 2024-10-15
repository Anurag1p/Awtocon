import React, { useState, useEffect } from "react";

import MultiStepForm from '../../components/MultiStepForm';
import VendorNavbar from './VendorNavbar';
import Sidebar from '../../components/Sidebar';
import { Box, Button, Skeleton } from "@mui/material";
import Animations from '../../components/Animations';
import { DataGrid } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import { useSelector } from "react-redux";
import CreateVendor from "./CreateVendor";


const CreateVendorForm = (
    {
        COMPANY_ID,
        COMPANY_USERNAME,
        COMPANY_PARENT_ID,
        COMPANY_PARENT_USERNAME,
    }
) => {
    const [resStatus, setResStatus] = useState("loading");
    const [display, setDisplay] = useState("unarchive");
    const companyData = useSelector(state => state?.setOneCompany?.user);
    const companyLogin = useSelector(state => state?.companyLogin?.user);
    const companyEmail = companyLogin[1];
    const company = companyEmail.split('@')[0];
    const companyName = company.charAt(0).toUpperCase() + company.slice(1);

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
    const rows = [
        {
            id: 1,
            vendorName: "ABC Supplies",
            vendorEmail: "contact@abc.com",
            vendorAddress: "123 Main St, Springfield, IL",
            contactDetails: "+1 (555) 123-4567",
            country: "United States",
            state: "Illinois",
            city: "Springfield",
            bankDetails: {
                accountNumber: "123456789",
                bankName: "ABC Bank",
                swiftCode: "ABC123"
            }
        },
        {
            id: 2,
            vendorName: "Global Traders",
            vendorEmail: "info@globaltraders.com",
            vendorAddress: "456 Market Ave, New York, NY",
            contactDetails: "+1 (555) 987-6543",
            country: "United States",
            state: "New York",
            city: "New York City",
            bankDetails: {
                accountNumber: "987654321",
                bankName: "Global Bank",
                swiftCode: "GLB987"
            }
        },
        {
            id: 3,
            vendorName: "Tech Solutions",
            vendorEmail: "sales@techsolutions.com",
            vendorAddress: "789 Technology Blvd, Austin, TX",
            contactDetails: "+1 (555) 654-3210",
            country: "United States",
            state: "Texas",
            city: "Austin",
            bankDetails: {
                accountNumber: "456789123",
                bankName: "Tech Bank",
                swiftCode: "TCH456"
            }
        },
        {
            id: 4,
            vendorName: "Innovative Products",
            vendorEmail: "support@innovativeproducts.com",
            vendorAddress: "321 Innovation St, San Francisco, CA",
            contactDetails: "+1 (555) 432-1098",
            country: "United States",
            state: "California",
            city: "San Francisco",
            bankDetails: {
                accountNumber: "654321987",
                bankName: "Innovative Bank",
                swiftCode: "INN321"
            }
        },
        {
            id: 5,
            vendorName: "Green Earth Corp",
            vendorEmail: "contact@greenearth.com",
            vendorAddress: "654 Eco Ave, Portland, OR",
            contactDetails: "+1 (555) 876-5432",
            country: "United States",
            state: "Oregon",
            city: "Portland",
            bankDetails: {
                accountNumber: "321654987",
                bankName: "Eco Bank",
                swiftCode: "ECO654"
            }
        },
        {
            id: 6,
            vendorName: "Blue Ocean Traders",
            vendorEmail: "info@blueocean.com",
            vendorAddress: "987 Ocean Dr, Miami, FL",
            contactDetails: "+1 (555) 123-9876",
            country: "United States",
            state: "Florida",
            city: "Miami",
            bankDetails: {
                accountNumber: "987123456",
                bankName: "Ocean Bank",
                swiftCode: "BOC987"
            }
        }
    ];
    
    const columns = [
        {
            field: 'vendorName',
            headerName: 'Vendor Name',
            width: 200,
            editable: true // Allow editing of the field (optional)
        },
        {
            field: 'vendorEmail',
            headerName: 'Vendor Email',
            width: 250,
            editable: true // Optional
        },
        {
            field: 'vendorAddress',
            headerName: 'Vendor Address',
            width: 300,
            editable: true // Optional
        },
        {
            field: 'contactDetails',
            headerName: 'Contact Details',
            width: 200,
            editable: true // Optional
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 150,
            editable: true // Optional
        },
        {
            field: 'state',
            headerName: 'State',
            width: 150,
            editable: true // Optional
        },
        {
            field: 'city',
            headerName: 'City',
            width: 150,
            editable: true // Optional
        },
        {
            field: 'bankDetails', // This will render bank account information
            headerName: 'Bank Account',
            width: 300,
            valueGetter: (params) =>
                `${params.row.bankDetails.accountNumber || ''}`, // Customize how bank details are displayed
            editable: true // Optional
        },
        {
            field: 'swiftCode',
            headerName: 'SWIFT Code',
            width: 150,
            valueGetter: (params) =>
                `${params.row.bankDetails.swiftCode || ''}`, // Extract swiftCode from bankDetails
            editable: true // Optional
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setResStatus("success");
        }, 1000);
    }, []);
    

    return (
        <>

            <Sidebar
                active={5}
                COMPANY_ID={COMPANY_ID}
                COMPANY_USERNAME={COMPANY_USERNAME}
                COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                userType="company"
            />
            {/* <VendorNavbar /> */}
            <Box className="box" style={{ background: "#277099" }}>
                {resStatus ? (
                    <>
                        <CreateVendor />
                    </>
                ) : (
                    <>
                        <button
                            size="small"
                            disabled
                            className={"btn button border-bottom-0 bg-white btn-sm"}
                        >
                            All Vendors
                        </button>
                        <button
                            style={{ color: "#277099" }}
                            className="btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"
                            size="small"
                            disabled
                        >
                            + Add New Vendor
                        </button>
                    </>
                )}
                <div className="myscreen p-3">

                    <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                        {resStatus === "success" ? (

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                sx={{ border: "none", height: '80vh' }}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 14,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableMultipleSelection
                                density="compact"
                                slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                                getRowId={(row) => row.id}
                            />
                        ) : resStatus === "error" ? (
                            <Box>
                                <div
                                    className="p-3"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}
                                >
                                    <small className="text-dark">
                                        <p>Check your connection and try again. :(</p>
                                        {/* <center>
                                            <button
                                                onClick={getAllSubcontractor}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Retry
                                            </button>
                                        </center> */}
                                    </small>
                                </div>
                            </Box>
                        ) : <Animations />}
                    </Box>

                </div>

            </Box>
        </>

    );
};

export default CreateVendorForm;
