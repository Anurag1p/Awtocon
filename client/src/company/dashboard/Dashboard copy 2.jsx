import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


// const StyledCard = styled(Card)(({ theme }) => ({
//   margin: theme.spacing(0.5),
//   transition: "background-color 0.3s ease-in-out",

//   "&:hover": {
//     backgroundColor: theme.palette.primary.main, // Change to your desired hover color
//     "& .MuiTypography-root": {
//       color: "#fff", // Change to white or your desired hover text color
//     },
//     "& a": {
//       color: "#fff", // Change to white or your desired hover link color
//     },
//   },
// }));


const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(0.5),
  transition: "background-color 0.3s ease-in-out",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  maxWidth: 500,
  height: 300,
  padding: 35,

  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  borderRadius: 20,
  background: `linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.75) 70%, 
    rgba(255, 255, 255, 0.25)
  )`,
  boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(15px)",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },

  "& .MuiTypography-root": {
    marginBottom: 0,
    fontSize: 20,
  },
}));

export default function CompanyDashboard() {

  const companyData = useSelector(state => state?.setOneCompany?.user);
  const projectAllData = useSelector(prev => prev?.allProjectData?.projects);
  const empdata = useSelector((state) => state?.allEmployee?.employees || []);

  const COMPANY_ID = companyData?.[0];
  const COMPANY_USERNAME = companyData?.[1];
  const COMPANY_PARENT_ID = companyData?.[2];
  const COMPANY_PARENT_USERNAME = companyData?.[3];
  const [open, setOpen] = React.useState(false);

  const data = [
    {
      contractname: "Projects",
      counts: projectAllData?.length,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "/company/projects",
    },
    {
      contractname: "Employees",
      counts: empdata?.length,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "/company/employees",
    },
    {
      contractname: "Attandance",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Documents",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Sub-Contractors",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },
    {
      contractname: "Payments",
      counts: "200",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      url: "Learn More",
    },

  ];

  const data2 = [
    {
      Paymentstatus: "15",
      Pending: "300",
      Paymentcomplete: "14",
      Approval: "Learn More",
    },
  ];

  const card = (
    <>
      {data.map((post) => (
        <Grid xl={4} xs={12} item spacing={3} key={post.contractname}>
          <RouterLink to={post.url} style={{ textDecoration: "none", color: "inherit" }}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6"  color="tan">
                  {post.contractname}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="#3366cc"
                  gutterBottom
                >
                  Total {post.contractname}: {post.counts}
                </Typography>
                <Typography component="div" color="#fff">
                  {post.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </RouterLink>
        </Grid>
      ))}
    </>
  );
  const card2 = (
    <>
      {data2.map((post) => (
        <Grid xl={12} item spacing={3} key={post.Paymentstatus}>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h5"
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Payment Status{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#fff",
                    background: "red",
                    px: 1,
                    borderRadius: 10,
                  }}
                ></Typography>
              </Typography>
              <Typography
                variant=""
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Pending{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#333",
                    background: "yellow",
                    px: 1,
                    borderRadius: 10,
                  }}
                >
                  {post.Pending}
                </Typography>
              </Typography>
              <Typography
                variant=""
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Payment Complete{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#fff",
                    background: "green",
                    px: 1,
                    borderRadius: 10,
                  }}
                >
                  {post.Paymentcomplete}
                </Typography>
              </Typography>
              <Typography
                variant=""
                sx={{ mb: 1, display: "inline-block" }}
                color="primary"
              >
                Waiting for Approval{" "}
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#fff",
                    background: "red",
                    px: 1,
                    borderRadius: 10,
                  }}
                >
                  {post.Paymentcomplete}
                </Typography>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{post.url}</Button>
            </CardActions>
          </StyledCard>
        </Grid>
      ))}
    </>
  );


  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={0}
        toggle={open}
      />

      <Navbar toggle={() => setOpen((e) => !e)} />

      <Container
        id="content"
        style={{ height: "100vh", position: "relative" }}
        maxWidth="xl"
      >

        <Box className="box" overflow={"auto"}>
          <Grid container spacing={2} sx={{ p: 3.5 }}>
            <Grid container item xl={9} xs={12}>
              {card}
            </Grid>

            <Grid container item xl={3} xs={12}>
              {card2}
            </Grid>
          </Grid>
        </Box>

      </Container >
    </>
  );
}
