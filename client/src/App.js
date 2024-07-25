import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import AdminDashboard from "./Admin/AdminDashboard";
import Signup from "./auth/Signup";
import { auth } from "./firebase";
import AdminLogin from "./auth/AdminLogin";
import Firecreate from "./components/Firecreate";
import UserLogin from "./auth/UserLogin";
import Updates from "./auth/RestEmailLink";


// admin company 

import { getAdminCompData } from "./redux/slice/AdminCompSlice"
// company employee 
import EmployeeTimeSheet from "./company/myemployee/EmployeeTimeSheet";
import Employee from "./company/myemployee/Employee";
import EmployeeDetails from "./company/myemployee/EmployeeDetail";
import EmployeeManual from "./company/myemployee/EmployeeManual";
import EmployeeDocuments from "./company/myemployee/EmployeeDocuments";

// company projects
import Project from "./company/myproject/Project";
import ProjectDetail from "./company/myproject/ProjectDetail";
import ProjectAllocate from "./company/myproject/ProjectAllocate";
import ProjectLoc from "./company/myproject/ProjectLoc";
import ProjectDocuments from "./company/myproject/ProjectDocuments";
import SubcontractorAssigned from "./company/myproject/SubcontractorAssigned";

// company attendance
import AttendanceAcknowledge from "./company/attendance/AttendanceAcknowledge";

// company subcontractor
import Contractor from "./company/mySubcontractor/Contractor";
import ContractorDetail from "./company/mySubcontractor/ContractorDetail";
import SubContractorDoc from "./company/mySubcontractor/SubContractorDoc";
// import SubcontractorProjectDetail from "./company/mySubcontractor/SubcontractorProjectDetail";

import Documents from "./company/document/Documents";
import Dashboard from "./company/dashboard/Dashboard"; //company dashboard
import { useDispatch, useSelector } from "react-redux";
import { setCompanyuser } from "./redux/slice/CompanyLoginSlice"

// /.......Employees
import EmployeeLoginHome from "./employee/EmployeeLoginHome";
import EmployeeTimeSheetUser from "./employee/EmployeeTimeSheetUser";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeHistory from "./employee/EmployeeHistory";

// redux setup anurag 
import { getProjectData } from "./redux/slice/getallProjectSlice";
// import { getSingleCompData } from "./redux/slice/SingleCompSlice";
import { getEmployeeData } from "./redux/slice/EmployeeDataSlice";
// import { getAllSubcontractor } from "./redux/slice/SubContractorSlice";
import { getAllttendance } from "./redux/slice/AttendanceSlice";
import { getAllCompany } from "./redux/slice/AllCompanySlice"

// Subcontractor setup ........................................

// suncontractor employee 
import SubEmployeeDetail from "./subcontractorPanel/subcontractor_employee/SubEmployeeDetail";
import SubEmployeeTimeSheet from "./subcontractorPanel/subcontractor_employee/SubEmployeeTimeSheet";
import SubEmployeeManual from "./subcontractorPanel/subcontractor_employee/SubEmployeeManual";
import SubEmployeeDocuments from "./subcontractorPanel/subcontractor_employee/SubEmployeeDocuments";
import SubEmployee from "./subcontractorPanel/subcontractor_employee/SubEmployee";

// suncontractor project
import SubProject from "./subcontractorPanel/subcontractor_projects/SubProject";
import SubProjectDetail from "./subcontractorPanel/subcontractor_projects/SubProjectDetail";
import SubProjectAllocate from "./subcontractorPanel/subcontractor_projects/SubProjectAllocate";
import SubProjectLoc from "./subcontractorPanel/subcontractor_projects/SubProjectLoc";
import SubProjectDocuments from "./subcontractorPanel/subcontractor_projects/SubProjectDocuments";

// suncontractor attendance
import SubDashboard from "./subcontractorPanel/SubDashboard";
import SubDocument from "./subcontractorPanel/SubContractor_document/SubDocument";
import SubAttendanceAcknowledge from "./subcontractorPanel/attendance/SubAttendanceAcknowledge";
import SubAssignedProjects from "./subcontractorPanel/assignedProject/SubAssignedProject";
import SubProjectAssignDetails from "./subcontractorPanel/assignedProject/SubProjectAssignDetails";
import SubGallery from "./subcontractorPanel/assignedProject/SubGallery";
import Violation from "./subcontractorPanel/assignedProject/Violation";
import TaskSpliting from "./subcontractorPanel/assignedProject/TaskSpliting";
import Tasks from "./company/myproject/Tasks";
import ProjectTaskGallery from "./company/myproject/ProjectTaskGallery";


function App() {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch()
  const AdminLoginData = useSelector(state =>state?.adminLogin?.user )
  
  console.log("Admin_anuragPal=============>>",AdminLoginData)
  // const admin_id = AdminLoginData[2]
  // const admin_username = AdminLoginData[3]
  // const admin_id = userName && userName[2]
  // const admin_username = userName[3];

  const ADMIN_ID = AdminLoginData?.result?.ADMIN_ID;
  const ADMIN_USERNAME = AdminLoginData?.result?.ADMIN_USERNAME;

 

  console.log("admin_id", ADMIN_ID, "admin_username",ADMIN_USERNAME)

  const companyData = useSelector(prev => prev?.companyLogin?.user)

  const singleCompany = useSelector(state => state?.admin?.singleComp);

  console.log(singleCompany, "single company");

  const empdata = useSelector((state) => state?.allEmployee?.employees || []);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        const data = user?.displayName;
        const splitedData = data?.split("&&");
        console.log(user, "user");
        setUserName(splitedData);
        dispatch(setCompanyuser(splitedData))
        console.log(splitedData, "splitedData");
      }
    });
  }, []);



  // extract company
  const COMPANY_ID = companyData?.[0];
  const COMPANY_USERNAME = companyData?.[1];
  const COMPANY_PARENT_ID = companyData?.[2];
  const COMPANY_PARENT_USERNAME = companyData?.[3];


  // get company

  useEffect(() => {
    dispatch(getProjectData({
      PROJECT_PARENT_ID: COMPANY_ID,
      PROJECT_PARENT_USERNAME: COMPANY_USERNAME,
      PROJECT_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      PROJECT_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME])

  // gettingsingle company data from store

  // useEffect(() => {

  //   dispatch(getSingleCompData({
  //     COMPANY_ID: COMPANY_ID,
  //     COMPANY_USERNAME: COMPANY_USERNAME,
  //     COMPANY_PARENT_ID: COMPANY_PARENT_ID,
  //     COMPANY_PARENT_USERNAME: COMPANY_PARENT_USERNAME
  //   }))
  // }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME])


  useEffect(() => {
    dispatch(getAdminCompData({
      COMPANY_ID: COMPANY_ID,
      COMPANY_PARENT_ID: COMPANY_PARENT_ID,
      COMPANY_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
      COMPANY_PARENT_ID: COMPANY_PARENT_ID
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME])
  // getting the Employee Data from store 
  useEffect(() => {
    dispatch(getEmployeeData({
      EMPLOYEE_PARENT_ID: COMPANY_ID,
      EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
      EMPLOYEE_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
      EMPLOYEE_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME
    }))
  }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME, COMPANY_PARENT_ID])


  //getting the documents data from SUBCONTRACTOR
  // useEffect(() => {
  //   dispatch(getAllSubcontractor({
  //     SUBCONTRACTOR_PARENT_ID: COMPANY_ID,
  //     SUBCONTRACTOR_PARENT_USERNAME: COMPANY_USERNAME,
  //     SUBCONTRACTOR_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
  //     SUBCONTRACTOR_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME
  //   }))
  // }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_USERNAME, COMPANY_PARENT_ID])

  //getting the attendance data from store
  useEffect(() => {
    dispatch(getAllttendance({
      ADMIN_USERNAME: COMPANY_PARENT_USERNAME,
      EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
    }))
  }, [dispatch, COMPANY_USERNAME, COMPANY_PARENT_USERNAME])


  // useEffect(() => {
  //   dispatch(getAllSubcontractor({
  //     COMPANY_ID: COMPANY_ID,
  //     COMPANY_USERNAME: COMPANY_USERNAME,
  //     COMPANY_PARENT_ID: COMPANY_PARENT_ID,
  //     COMPANY_PARENT_USERNAME: COMPANY_PARENT_USERNAME
  //   }));
  // }, [dispatch, COMPANY_ID, COMPANY_USERNAME, COMPANY_PARENT_ID, COMPANY_PARENT_USERNAME]);

  // getting the data of all company 
  useEffect(() => {
    dispatch(getAllCompany({
      COMPANY_PARENT_ID: ADMIN_ID,
      COMPANY_PARENT_USERNAME: ADMIN_USERNAME,
    }))
  }, [dispatch, ADMIN_USERNAME, ADMIN_USERNAME])

  return (
    <div
      className="wrapper"
      style={{ overflowX: "scroll", overflow: "hidden" }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/root" element={<AdminLogin />} />
            <Route path="/" element={<UserLogin />} />
            <Route path="/admin" element={<AdminDashboard
              AdminLoginData={AdminLoginData}
            />
            } />
            <Route path="/employee/history" element={<EmployeeHistory />} />
            {/* <Route path="/myadmin" element={<AdminDashboard />} /> */}
            <Route path="/test" element={<Updates />} />


            {/* compnay dashboard */}
            <Route
              path="/company/dashboard/"
              element={
                <Dashboard />
              }
            />
            {/* company dashboard */}

            {/* project */}
            <Route
              path="/company/projects/"
              element={
                <Project />
              }
            />
            <Route
              path="/company/projects/detail"
              element={<ProjectDetail />}
            />

            <Route
              path="/company/projects/allocate-employee"
              element={<ProjectAllocate />}
            />

            <Route
              path="/company/projects/allocated_subcontractor"
              element={<SubcontractorAssigned />}
            />

            <Route path="/company/projects/tracking" element={<ProjectLoc />} />

            <Route
              path="/company/projects/documents"
              element={<ProjectDocuments />}
            />
            <Route
              path="/company/projects/tasks"
              element={<Tasks />}
            />

            {/* project */}

            {/* My company employees */}
            <Route
              path="/company/employees"
              element={
                <Employee
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />


            <Route
              path="/company/employees/detail"
              element={<EmployeeDetails />}
            />
            <Route
              path="/company/employees/timesheet"
              element={<EmployeeTimeSheet />}
            />
            <Route
              path="/company/employees/manual-attendence"
              element={<EmployeeManual />}
            />
            <Route
              path="/company/employees/documents"
              element={<EmployeeDocuments />}
            />
            {/* My employees */}

            {/* attendance */}
            <Route
              path="/company/attendance"
              element={
                <AttendanceAcknowledge
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />

            {/* attendance */}

            {/* document company */}
            <Route
              path="/company/documents"
              element={
                <Documents
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />

            {/* document company */}

            {/* My contractors */}
            <Route
              path="/company/subcontractors"
              element={
                <Contractor
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />
            <Route
              path="/company/subcontractors/detail"
              element={<ContractorDetail />}
            />

            <Route
              path="/company/subcontractors/documents"
              element={<SubContractorDoc />}
            />

            {/* for employee login ... */}
            <Route
              path="/employee/home"
              element={<EmployeeLoginHome state={AdminLoginData} />}
            />

            <Route
              path="/employee/mark-attendance"
              element={<EmployeeAttendance state={AdminLoginData} />}
            />


            {/*...... for employee section  only ...... */}
            <Route
              path="/employee/project-assigned"
              element={<EmployeeLoginHome state={AdminLoginData} />}
            />
            <Route
              path="/employee/attendance-history"
              element={<EmployeeTimeSheetUser state={AdminLoginData} />}
            />

            <Route
              path="/employee/attendance/:latt/:lngi/:areas/:loca/:employees/:projects/:projectids"
              element={<EmployeeAttendance state={AdminLoginData} />}
            />

            {/* My contractos */}

            {/* for subcontractor Login  */}


            <Route
              path="/subcontractor/dashboard"
              element={<SubDashboard state={AdminLoginData} />}
            />

            <Route
              path="/subcontractor/projects"
              element={
                <SubProject requiredData={companyData} />
              }
            />


            {/* subcontractor employees ... */}
            <Route
              path="/subcontractor/employees"
              element={
                <SubEmployee
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />

            <Route
              path="/subcontractor/employees/detail"
              element={<SubEmployeeDetail />}
            />

            <Route
              path="/subcontractor/employees/timesheet"
              element={<SubEmployeeTimeSheet />}
            />

            <Route
              path="/subcontractor/employees/manual-attendence"
              element={<SubEmployeeManual />}
            />
            <Route
              path="/subcontractor/employees/documents"
              element={<SubEmployeeDocuments />}
            />
            {/* Subcontractor Projects  */}

            <Route
              path="/subcontractor/projects/detail"
              element={<SubProjectDetail />}
            />

            <Route
              path="/subcontractor/projects/allocate-employee"
              element={<SubProjectAllocate />}
            />

            <Route
              path="/subcontractor/projects/documents"
              element={<SubProjectDocuments />}
            />
            <Route
              path="/subcontractor/attendance"
              element={
                <SubAttendanceAcknowledge
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />

            <Route path="/subcontractor/projects/tracking" element={<SubProjectLoc />} />

            <Route
              path="/subcontractor/documents"
              element={
                <SubDocument
                  COMPANY_ID={COMPANY_ID}
                  COMPANY_USERNAME={COMPANY_USERNAME}
                  COMPANY_PARENT_ID={COMPANY_PARENT_ID}
                  COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
                />
              }
            />

            <Route
              path="/subcontractor/assigned-projects"
              element={<SubAssignedProjects state={AdminLoginData} />}
            />

            <Route
              path="/subcontractor/assigned-projects/detail"
              element={<SubProjectAssignDetails state={AdminLoginData} />}
            />
            <Route
              path="/subcontractor/assigned-projects/task/gallery"
              element={<SubGallery state={AdminLoginData} />}
            />
            <Route
              path="/subcontractor/assigned-projects/violation"
              element={<Violation state={AdminLoginData} />}
            />
            <Route
              path="/subcontractor/assigned-projects/tasks"
              element={<TaskSpliting state={AdminLoginData} />}
            />


            {/* SubProjectDetail */}

            {/* <Route
              path="/subcontractor/projects-details/:employees/:projects"
              element={<SubcontractorProjectDetail state={userName} />}
            /> */}

            {/* 
            <Route
              path="/subcontractor/dashboard"
              element={<EmployeeLoginHome state={userName} />}
            /> */}
            {/* <Route
              path="/company/employees/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<EmployeeSrc />}
            />
            <Route
              path="/company/attendance/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<AttendanceReport />}
            />
            <Route
              path="/company/documents/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<Document />}
            /> */}

            {/* <Route
              path="/company/contractor/:COMPANY_ID/:COMPANY_USERNAME/:COMPANY_PARENT_ID/:COMPANY_PARENT_USERNAME"
              element={<SubContract />}
            /> */}

            <Route path="/temp/" element={<Firecreate />} />

            {/* testform  */}
            {/* <Route path="/formvalidations" element={<ValidationSchemaExample/>} /> */}
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
