import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../firebase"; // Ensure this import is included
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({
  COMPANY_USERNAME,
  active,
  toggle,
  userType,
}) => {

  const companyData = useSelector(state => state?.setOneCompany?.user);
  const companyLogin = useSelector(state => state?.companyLogin?.user);
  const companyEmail = companyLogin[1];
  const company = companyEmail.split('@')[0]; 
  const companyName = company.charAt(0).toUpperCase() + company.slice(1); 

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const drawerWidth = 240; // Set a fixed width
  const filterData = companyData?.[0];

  const renderLinks = () => {
    const links = [
      { path: userType === 'company' ? '/company/dashboard' : '/subcontractor/dashboard', label: 'My Dashboard' },
      { path: userType === 'company' ? '/company/projects' : '/subcontractor/projects', label: 'My Projects' },
      { path: userType === 'company' ? '/company/employees' : '/subcontractor/employees', label: 'My Employees' },
      { path: userType === 'company' ? '/company/attendance' : '/subcontractor/attendance', label: 'Attendance' },
      { path: userType === 'company' ? '/company/documents' : '/subcontractor/documents', label: 'Documents' },
      { path: userType === 'company' ? '/company/subcontractors' : '/subcontractor/assigned-projects', label: userType === 'company' ? 'My Subcontractors' : 'Assigned Project' },
    ];

    return links.map((link, index) => (
      <Link
        to={link.path}
        className="nav-link"
        style={{ background: active === index ? "#f3f3f3" : "" }}
        key={index}
      >
        <ListItem disablePadding>
          <ListItemButton sx={{ fontSize: "16px" }}>
            {link.label}
          </ListItemButton>
        </ListItem>
      </Link>
    ));
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="sidebar-header d-flex p-3 f-20" style={{ justifyContent: "space-between" }}>
          <h5 className="pt-2" style={{ color: "tan" }}>{companyName}</h5>
          <Tooltip title={COMPANY_USERNAME}>
            <Avatar>{filterData?.companyName?.substring(0, 1)}</Avatar>
          </Tooltip>
        </div>

        <Divider />

        <List>
          {renderLinks()}
        </List>

        <Divider />
        <div className="login sidebar_footer position-absolute p-3" style={{ bottom: "0" }}>
          <button className="logoutbtn" type="submit" onClick={Logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
          </button>
        </div>
        <Divider />
      </Drawer>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={toggle}
      >
        <div className="sidebar-header d-flex p-3 f-20" style={{ justifyContent: "space-between" }}>
          <h5 className="pt-2">{COMPANY_USERNAME}</h5>
        </div>
        <Divider />

        <List>
          {renderLinks()}
        </List>

        <Divider />
        <div className="login sidebar_footer position-absolute p-3" style={{ bottom: "0" }}>
          <button className="text-dark text-uppercase btn-link border-0 bg-lighty" type="submit" onClick={Logout}>
            <LogoutIcon style={{ display: "inline" }} /> Logout
          </button>
        </div>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
