import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../assests/css/Login.module.css";
import SimpleBackdrop from "../components/Backdrop";
import { validateEmail, validatePassword } from "../components/Validation";
import Logincomp from "./Logincomp";


const UserLogin = ({ onDataFetched }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ADMIN_USERNAME: "",
    ADMIN_PASSWORD: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [empty, setEmpty] = useState("");
  const [activeButton, setActiveButton] = useState('Middle');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  const handleSubmission = (e) => {
    e.preventDefault();

    // Clear previous validation errors
    setErrorMsg("");
    setEmpty("");
    setPasswordError("");
    setEmailError("")


    // Validate phone number, username, and email fields
    if (!values.ADMIN_USERNAME || !values.ADMIN_PASSWORD) {
      setEmpty("Fill all fields");
      return;
    }


    //validate
    // const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidEmail = validateEmail(values.ADMIN_USERNAME);
    const isValidPassword = validatePassword(values.ADMIN_PASSWORD);


    if (!isValidEmail) {
      setEmailError("Invalid Email");
      return;
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/login",
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data, "mylogin");
        setIsSubmitting(false);
        // setLoginSuccess(true);
        const data = response.data;
        navigate("/admin", { state: data.user })
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setErrorMsg(error.response.data.error);
        } else if (error.response.status === 404) {
          setErrorMsg(error.response.data.error);
        } else if (error.response.status === 401) {
          setErrorMsg(error.response.data.error);
        }
        else {
          setPasswordError("Network")
        }
        setIsSubmitting(false);
        console.log("Network")
      });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <Logincomp message={onDataFetched} />
        </div>

        {/* Add the MUI backdrop component here */}
        <SimpleBackdrop open={isSubmitting} />
      </div>
    </>
  );
}

export default UserLogin;
