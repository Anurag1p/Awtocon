import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist/es/constants';
import CompanyLoginSlice from "./slice/CompanyLoginSlice";
import AdminSlice from "./slice/AdminSlice";
// import AllCompanyDetail from "./slices/getallCompanySlice";

// import AllProjectDetail from "./slices/getallProjectSlice"
import AllAttendanceDetail from "./slices/getAttendanceSlice";
// import AllEmployeeDetail from "./slices/getEmployee";
import AllContractorDetail from "./slices/getContrctorSlice";
import AllDocumentDetail from "./slices/getAllDocument"
import EmployeeLogin from "./slice/EmployeeLogin"
import setOneCompany from "./slices/getOneCompanySlice";

// Redux setup Anuarag 

import getallProjectSlice from "./slice/getallProjectSlice";
import getAdminCompData from "./slice/AdminCompSlice";
import EmployeeDataSlice from "./slice/EmployeeDataSlice";
import companyDoc from "./slice/GetCompanyDocSlice";        //function for doc
import AllSubcontractor from "./slice/SubContractorSlice"
import attendanceData from "./slice/AttendanceSlice";
import employee_one from "./slice/EmpDashboardSlice";
import allCompanyData from "./slice/AllCompanySlice";
import taskImgApprove from "./slice/TaskImageApproveSlice"



const persistConfig = {
  key: 'root',
  version: 0,
  storage: storageSession,
};

const loginPersistConfig = {
  key: 'login',
  version: 0,
  storage: storageSession,
};


const employeePersistConfig = {
  key: 'employee',
  version: 0,
  storage: storageSession,
};

const persistedLoginReducer = persistReducer(loginPersistConfig, CompanyLoginSlice);
const persistedAdminReducer = persistReducer(persistConfig,AdminSlice)
const persistedEmployeeReducer = persistReducer(employeePersistConfig, EmployeeLogin)
// const persistedAdminCompanies = persistReducer(persistConfig, getAdminCompData)

// const persistedCompanyReducer = persistReducer(persistConfig,setOneCompany)
// const persistedAllCompanyReducer = persistReducer(persistConfig,AllCompanyDetail)
// const persistedAllProjectDetail = persistReducer(persistConfig,AllProjectDetail)



const rootReducer = combineReducers({
  companyLogin: persistedLoginReducer,
  adminLogin: persistedAdminReducer,
  employeeLogin: persistedEmployeeReducer,
  // allProject:AllProjectDetail,
  // allEmployee:AllEmployeeDetail,
  allCompany: allCompanyData,
  allContractor: AllContractorDetail,
  allAttendation: AllAttendanceDetail,
  allDocument: AllDocumentDetail,
  allProjectData: getallProjectSlice,
  adminCompanies: getAdminCompData,
  allEmployee: EmployeeDataSlice,
  companyDocuments: companyDoc,
  allsubcontractor: AllSubcontractor,
  allAttandanceData: attendanceData,
  employeeOne : employee_one, 
  taskImgApprove : taskImgApprove,

  // setOneCompany:persistedCompanyReducer

  // Add other reducers here if needed
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

