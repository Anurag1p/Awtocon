import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const SubProjectNav = ({
  filterData,
  active,
  COMPANY_ID,
  COMPANY_USERNAME,
  COMPANY_PARENT_ID,
  COMPANY_PARENT_USERNAME,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Sidebar
        active={1}
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        userType="subcontractor"
      />
      <div
        className="container-fluid pb-0 g-0"
        style={{ background: "#277099" }}
      >
        <Button
          onClick={() => navigate("/subcontractor/projects", { state: filterData })}
          variant="contained"
          className="btn rounded-0"
          size="small"
        >
          <ArrowBackIcon style={{ fontSize: "20px" }} />
        </Button>

        <Button
          onClick={(e) =>
            navigate("/subcontractor/projects/detail", {
              state: [
                filterData,
                COMPANY_ID,
                COMPANY_USERNAME,
                COMPANY_PARENT_ID,
                COMPANY_PARENT_USERNAME,
              ],
            })
          }
          variant={1 === active ? "outlined" : "outlined"}
          className={
            1 === active
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-bottom-0  rounded-0 text-light"
          }
          size="small"
        >
          Detail
        </Button>

        <Button
          onClick={(e) =>
            navigate("/subcontractor/projects/allocate-employee", {
              state: [
                filterData,
                COMPANY_ID,
                COMPANY_USERNAME,
                COMPANY_PARENT_ID,
                COMPANY_PARENT_USERNAME,
              ],
            })
          }
          variant={2 === active ? "outlined" : "outlined"}
          className={
            2 === active
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-0  rounded-0 text-light"
          }
          size="small"
        >
          Allocated Employees
        </Button>

        <Button
          onClick={(e) =>
            navigate("/subcontractor/projects/tracking", {
              state: [
                filterData,
                COMPANY_ID,
                COMPANY_USERNAME,
                COMPANY_PARENT_ID,
                COMPANY_PARENT_USERNAME,
              ],
            })
          }
          variant={3 === active ? "outlined" : "outlined"}
          className={
            3 === active
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-0  rounded-0 text-light"
          }
          size="small"
        >
          Track
        </Button>

        <Button
          onClick={(e) =>
            navigate("/subcontractor/projects/documents", {
              state: [
                filterData,
                COMPANY_ID,
                COMPANY_USERNAME,
                COMPANY_PARENT_ID,
                COMPANY_PARENT_USERNAME,
              ],
            })
          }
          variant={4 === active ? "outlined" : "outlined"}
          className={
            4 === active
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-0  rounded-0 text-light"
          }
          size="small"
        >
          Documents
        </Button>
      </div>
    </>
  );
};

export default SubProjectNav;
