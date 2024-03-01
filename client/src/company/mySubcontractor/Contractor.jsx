import React, { useState, useEffect } from "react";
import { Box, Button, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSubcontractor } from "../../redux/slice/SubContractorSlice";
import Sidebar from "../../components/Sidebar";
import CreateContractor from "./CreateContractor";
import EditSubcontract from "./EditSubContract";
import Animations from "../../components/Animations";
import { styled } from "@mui/material/styles";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";

const Contractor = ({
  COMPANY_ID,
  COMPANY_USERNAME,
  COMPANY_PARENT_ID,
  COMPANY_PARENT_USERNAME,
}) => {
  const [display, setDisplay] = useState("unarchive");
  const [resStatus, setResStatus] = useState("loading"); // Changed initial state to "loading"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubcontractor({
      SUBCONTRACTOR_PARENT_ID: COMPANY_ID,
      SUBCONTRACTOR_PARENT_USERNAME: COMPANY_USERNAME,
      SUBCONTRACTOR_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      SUBCONTRACTOR_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME
    })).then(() => setResStatus("success")) // Update state to "success" when data fetching is complete
      .catch(() => setResStatus("error")); // Update state to "error" if there is an error fetching data
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME, COMPANY_PARENT_ID])


  const subcontractorData = useSelector(state => state?.allsubcontractor?.subcontractor)
  console.log(subcontractorData, "subcontractor")

  const handleClick = (event) => {
    navigate("/company/subcontractors/detail", {
      state: [
        event.row,
        COMPANY_ID,
        COMPANY_USERNAME,
        COMPANY_PARENT_ID,
        COMPANY_PARENT_USERNAME,
      ],
    });
  };

  //  stylign for no rows of mui design 



  //   ended 

  const columns = [
    { field: "SUBCONTRACTOR_ID", headerName: "ID", width: 90 },
    { field: "SUBCONTRACTOR_USERNAME", headerName: "Subcontractor Email", width: 150 },
    { field: "SUBCONTRACTOR_NAME", headerName: "Name", width: 150 },
    { field: "SUBCONTRACTOR_PHONE", headerName: "Phone", width: 150 },
    { field: "SUBCONTRACTOR_START_DATE", headerName: "Start Date", width: 150 },
    { field: "SUBCONTRACTOR_END_DATE", headerName: "End Date", type: "number", width: 100 },
    { field: "SUBCONTRACTOR_SUPERVISOR", headerName: "Supervisor", width: 120 },
    {
      field: "action",
      headerName: "Action",
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
        // console.log(cellValues, "cellvalue")
        return (
          <Button >
            <EditSubcontract editsubcontract={cellValues} refetch={getAllSubcontractor} />
          </Button>
        )
      },
    },
  ];

  const rows = subcontractorData;

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
      <Box className="box" style={{ background: "#277099" }}>
        {resStatus ? (
          <>
            <button
              variant={"outlined"}
              className={
                display === "unarchive"
                  ? "btn button border-bottom-0 bg-white btn-sm"
                  : "btn btn-sm btn-primary rounded-0 border-0  rounded-0 text-light btn-sm"
              }
              onClick={() => setDisplay("unarchive")}
            >
              My Subcontractors
            </button>
            <CreateContractor
              COMPANY_ID={COMPANY_ID}
              COMPANY_USERNAME={COMPANY_USERNAME}
              COMPANY_PARENT_ID={COMPANY_PARENT_ID}
              COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
              name={"Subcontractor"}
            />
          </>
        ) : (
          <>
            <button
              size="small"
              disabled
              className={"btn button border-bottom-0 bg-white btn-sm"}
            >
              My Subcontractors
            </button>
            <button
              style={{ color: "#277099" }}
              className="btn rounded-0 border-0  rounded-0 text-light btn-primary btn-sm"
              size="small"
              disabled
            >
              + Add Subcontractor
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
                getRowId={(row) => row.SUBCONTRACTOR_ID}
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
                      <center>
                        <button
                          onClick={getAllSubcontractor}
                          className="btn btn-sm btn-secondary"
                        >
                          Retry
                        </button>
                      </center>
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

export default Contractor;
