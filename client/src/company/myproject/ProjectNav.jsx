import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const ProjectNav = ({
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
        userType="company"
      />
      <div
        className="container-fluid pb-0 g-0"
        style={{ background: "#277099" }}
      >
        <Button
          onClick={() => navigate("/company/projects", { state: filterData })}
          variant="contained"
          className="btn rounded-0"
          size="small"
        >
          <ArrowBackIcon style={{ fontSize: "20px" }} />
        </Button>


        <Button
          onClick={(e) =>
            navigate("/company/projects/detail", {
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
            navigate("/company/projects/allocate-employee", {
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
            navigate("/company/projects/tracking", {
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
            navigate("/company/projects/documents", {
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

        <Button
          onClick={(e) =>
            navigate("/company/projects/allocated_subcontractor", {
              state: [
                filterData,
                COMPANY_ID,
                COMPANY_USERNAME,
                COMPANY_PARENT_ID,
                COMPANY_PARENT_USERNAME,
              ],
            })
          }
          variant={5 === active ? "outlined" : "outlined"}
          className={
            5 === active
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-0  rounded-0 text-light"
          }
          size="small"
        >
          Subcontractor Assigned
        </Button>


        <Button
          onClick={(e) =>
            navigate("/company/projects/tasks", {
              state: [
                filterData,
                COMPANY_ID,
                COMPANY_USERNAME,
                COMPANY_PARENT_ID,
                COMPANY_PARENT_USERNAME,
              ],
            })
          }
          variant={6 === active ? "outlined" : "outlined"}
          className={
            6 === active
              ? "btn button border-bottom-0 bg-white"
              : "btn rounded-0 border-0  rounded-0 text-light"
          }
          size="small"
        >
          Tasks
        </Button>

      </div>
    </>
  );
};

export default ProjectNav;
