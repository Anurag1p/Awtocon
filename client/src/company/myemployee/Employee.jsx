import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeCreate from "./EmployeeCreate";
import Sidebar from "../../components/Sidebar";
import moment from "moment";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

// import for refetch the data to update 
import { getEmployeeData, setEmployeeData } from "../../redux/slice/EmployeeDataSlice";
import Navbar from "../../components/Navbar";
import Animations from "../../components/Animations";

const Employee = () => {

  const [archived, setArchived] = useState([{}]);
  const [display, setDisplay] = useState("unarchive");
  const [resStatus, setResStatus] = useState(true);
  const [openNav, setOpenNav] = useState(false);

  const navigate = useNavigate();

  // calling dispatch for caaling the fetchempData funciton 
  const dispatch = useDispatch();

  // data formSinlge company 
  const companyLoginData = useSelector((state) => state?.companyLogin?.user);
  console.log(companyLoginData, "companyLogin")
  const COMPANY_ID = companyLoginData?.[0];
  const COMPANY_PARENT_ID = companyLoginData?.[2];
  const COMPANY_USERNAME = companyLoginData?.[1];
  const COMPANY_PARENT_USERNAME = companyLoginData?.[3];
  console.log(COMPANY_ID, "COMAPNYid")

  useEffect(() => {
    dispatch(getEmployeeData({
      EMPLOYEE_PARENT_ID: COMPANY_ID,
      EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
      EMPLOYEE_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      EMPLOYEE_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME
    })).then(() => setResStatus("success"))
    .catch(() => setResStatus("error")); 
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME, COMPANY_PARENT_ID])

  const empdata = useSelector(state => state?.allEmployee?.employees);


  // archive
  const archiveEmployee = async (archiveData) => {
    try {
      const data = {
        EMPLOYEE_PARENT_ID: archiveData.row?.EMPLOYEE_PARENT_ID,
        EMPLOYEE_PARENT_USERNAME: archiveData.row?.EMPLOYEE_PARENT_USERNAME,
        EMPLOYEE_MEMBER_PARENT_ID: archiveData.row?.EMPLOYEE_MEMBER_PARENT_ID,
        EMPLOYEE_MEMBER_PARENT_USERNAME:
          archiveData.row?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        EMPLOYEE_ID: archiveData.row?.EMPLOYEE_ID,
      };

      console.log("Data:", data);

      const response = await axios.post("/api/archive-employee", data);

      if (response.status === 200) {
        toast.success("Employee Archived!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        dispatch(getEmployeeData(response.data.result))
      } else {
        toast.error("Failed to Archived!", {});
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while archiving the employee.", {
        // Show for 2 seconds
      });
    }
  };

  // unarchieve
  const unarchiveEmployee = async (archiveemp) => {
    try {
      const data = {
        EMPLOYEE_PARENT_ID: archiveemp.row?.EMPLOYEE_PARENT_ID,
        EMPLOYEE_PARENT_USERNAME: archiveemp.row?.EMPLOYEE_PARENT_USERNAME,
        EMPLOYEE_MEMBER_PARENT_ID: archiveemp.row?.EMPLOYEE_MEMBER_PARENT_ID,
        EMPLOYEE_MEMBER_PARENT_USERNAME:
          archiveemp.row?.EMPLOYEE_MEMBER_PARENT_USERNAME,
        EMPLOYEE_ID: archiveemp.row?.EMPLOYEE_ID,
      };


      const response = await axios.put("/api/unarchive-employee", data);

      console.log("Data:2", response.data.result);
      if (response.status === 200) {
        toast.success("Employee UnArchived!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        console.log("empdata before update:", empdata);
        dispatch(setEmployeeData(response.data.result));
        console.log("empdata after update:", empdata);

      } else {
        toast.error("Failed to UnArchived!", {
          // Show for 2 seconds
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while archiving the employee.", {
        // Show for 2 seconds
      });
    }
  };



  const handleClick = (event) => {
    navigate("/company/employees/detail", {
      state: [
        event.row,
      ],
    });
  };

  // attendance status

  const columns = [
    { field: 'sr', headerName: 'S No.', width: 60, renderCell: (params) => params.row.id + 1 },
    {
      field: "EMPLOYEE_USERNAME",
      headerName: "Employee Email",
      width: 120,
    },
    { field: "EMPLOYEE_ID", headerName: "ID", width: 60 },
    {
      field: "EMPLOYEE_NAME",
      headerName: "Name",
      width: 120,
    },

    {
      field: "EMPLOYEE_ROLE",
      headerName: "Employee Role",
      width: 120,
    },
    {
      field: "EMPLOYEE_PHONE",
      headerName: "Phone",
      width: 110,
    },
    {
      field: "EMPLOYEE_HIRE_DATE",
      headerName: "Hire Date",
      width: 100,
    },
    {
      field: "EMPLOYEE_HOURLY_WAGE",
      headerName: "Hourly Wages",
      width: 110,
    },

    {
      field: "EMPLOYEE_EMPLMNTTYPE",
      headerName: "Employement Type",
      width: 120,
    },
    {
      field: "action",
      headerName: "Details",
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="view-btn btn btn-success"
            style={{ padding: "2px 2px" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            view
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (cellValues) => {
        return <EmployeeEdit edit={cellValues} />;
      },
    },
    {
      field: "archive",
      headerName: "Archive",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <>
            {display === "unarchive" ? (
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "12px", padding: "2px 10px" }}
                size="small"
                onClick={() => archiveEmployee(cellValues)}
              >
                Archive
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "12px", padding: "2px 10px" }}
                size="small"
                onClick={() => unarchiveEmployee(cellValues)}
              >
                UnArchive
              </Button>
            )}
          </>
        );
      },
    }
  ];

  const FilterArchive = empdata?.filter((newData) => newData?.ARCHIVED === false);
  // this extra line is only added to map the sr number with all rows of data 
  const rows = FilterArchive.map((data, index) => ({ id: index, ...data }));
  console.log("rows", rows);

  const archivedData = empdata?.filter((newData) => newData?.ARCHIVED === true);
  const rows2 = archivedData.map((data, index) => ({ id: index, ...data }));
  console.log("rows2", rows2);



  // const filterData = data?.row;

  return (
    <>
      <Sidebar
        active={2}
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        userType="company"
        toggle={openNav}
      />
      <Box className="box" style={{ background: "#277099" }}>
        <Navbar toggle={() => setOpenNav((e) => !e)}  name={COMPANY_USERNAME}/>

        {empdata && empdata.length > 0 ? (<><button
          variant={"outlined"}
          className={
            display === "unarchive"
              ? "btn button border-bottom-0 bg-white btn-sm"
              : "btn btn-sm btn-primary rounded-0 border-0  rounded-0 text-light btn-sm"
          }
          onClick={() => setDisplay("unarchive")}
        >
          My Employees
        </button>

          <button
            size="small"
            variant={"outlined"}
            className={
              display === "archive"
                ? "btn button border-bottom-0 bg-white btn-sm"
                : "btn btn-sm btn-primary rounded-0 border-0  rounded-0 text-light btn-sm"
            }
            onClick={() => setDisplay("archive")}
          >
            Archive
          </button>
          <EmployeeCreate
            COMPANY_ID={COMPANY_ID}
            COMPANY_USERNAME={COMPANY_USERNAME}
            COMPANY_PARENT_ID={COMPANY_PARENT_ID}
            COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
            name={"Employee"}

          /></>) : <>
          <button
            size="small"
            disabled
            className={"btn button border-bottom-0 bg-white btn-sm"}
          >
            My Employees
          </button>
          <button
            size="small"
            disabled
            className={"btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"}
          >
            Archive
          </button>
          <button

            style={{ color: "#277099" }}
            className="btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"
            size="small"
            disabled
          >
            + Add New Employee
          </button>
        </>}

        <div className="myscreen p-3">
          <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
            <>
              {empdata && empdata.length > 0 ? (<DataGrid
                className="display"
                sx={{ border: "none" }}
                rows={display === "archive" ? rows2 : rows}
                columns={columns}
                getRowId={(row) => row.EMPLOYEE_ID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                density="compact"
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                localeText={{
                  noRowsLabel: rows.length === 0 && "There is no Employies..",
                }}
              />) : resStatus === "error" ? (

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
                      <center>
                        <button
                          onClick={getEmployeeData}
                          className="btn btn-sm btn-secondary"
                        >
                          Retry
                        </button>
                      </center>
                    </small>
                  </div>
                </Box>
              ) : (
                 <Animations/>
              )}
            </>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Employee;
