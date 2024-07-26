import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputControl from "../components/InputControl";
import styles from "../assests/css/Login.module.css";
import SimpleBackdrop from "../components/Backdrop";
import { Alert, Stack } from "@mui/material";
import { validateEmail, validatePassword } from "../components/Validation";
import { setAdminUser, setAdminErr, setLoading } from '../redux/slice/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';

function AdminLogin({ onDataFetched }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) =>state.adminLogin?.user?.result  || { user: null, error: null, loading: false });

  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_PASSWORD: "",
  });

  console.log(values,"valuesy");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [empty, setEmpty] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault();

    // Clear previous validation errors
    setErrorMsg("");
    setEmpty("");
    setPasswordError("");
    setEmailError("");

    // Validate fields
    if (!values.ADMIN_USERNAME || !values.ADMIN_PASSWORD) {
      setEmpty("Fill all fields");
      return;
    }

    const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidPassword = validatePassword(values.ADMIN_PASSWORD);

    if (!isValidEmail) {
      setEmailError("Invalid Email");
      return;
    }

    dispatch(setLoading(true));

    // Axios request configuration
    const config = {
      method: "post",
      url: "/api/login",
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        setIsSubmitting(false);
        dispatch(setLoading(false));
        const data = response.data;


        console.log("data",data)
        dispatch(setAdminUser(data));
        navigate("/admin", { state: data.user });
      })
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response && error.response.data) {
          dispatch(setAdminErr(error.response.data.error));
          setErrorMsg(error.response.data.error);
        } else {
          setPasswordError("Network Error");
          setIsSubmitting(false);
        }
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h5 className={styles.heading}>Shalbro Constructions</h5>
          <h5 className="text-center">Login(root)</h5>

          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                ADMIN_USERNAME: event.target.value,
              }))
            }
            placeholder="Enter Username"
          />
          {emailError && (
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{emailError}</Alert>
            </Stack>
          )}

          <div style={{ position: "relative" }}>
            <InputControl
              label="Password"
              type={showPassword ? "password" : "text"}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  ADMIN_PASSWORD: event.target.value,
                }))
              }
              placeholder="Enter Password"
            />
            <span
              style={{ position: "absolute", right: "10px", top: "50%", cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </span>
          </div>

          {errorMsg && (
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{errorMsg}</Alert>
            </Stack>
          )}

          {empty && (
            <Stack sx={{ width: '100%' }} spacing={2} pt={1}>
              <Alert severity="error">{empty}</Alert>
            </Stack>
          )}

          <div className={styles.footer}>
            <button className="b-0" disabled={loading} onClick={handleSubmission}>
              {loading ? "Loading..." : "Login"}
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>

        {/* Add the MUI backdrop component here */}
        <SimpleBackdrop open={isSubmitting} />
      </div>
    </>
  );
}

export default AdminLogin;
