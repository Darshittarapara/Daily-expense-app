import React, { useContext, useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { Input } from "baseui/input";
import Card from "../../../components/UI/Card";
import { NavLink, useNavigate } from "react-router-dom";
import authContext from "../../../context/AuthContext";
import "./Signup.css";
import "../auth.css";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
const SignUp = () => {
  const navigator = useNavigate();


  // useEffect(() => {
  //   if (isAuth || user?.userToken) {
  //      navigator("/");
  //   };
  // }, []);


  // const handlerSubmit = async (e) => {
  //   e.preventDefault();
  //   const isEmailVaild = checkBlankUserInput(userEmail);
  //   const isPassWordVaild = checkBlankUserInput(userPassword);
  //   const isUserNameBlank = checkBlankUserInput(userName);

  //   if (isEmailVaild) {
  //     setEmailValidate("Please enter email ");
  //   }
  //   if (isPassWordVaild) {
  //     setPassWordValidate("Please enter password");
  //   }
  //   if (isUserNameBlank) {
  //     setUserNameValidate("please enter user name");
  //   }
  //   if (userPassword.trim().length < 6 && userPassword.trim().length > 0) {
  //     setPassWordValidate("Please enter minimum 6 digit");
  //     setLoading(false);
  //     return;
  //   }
  //   if (userEmail !== "" && userName !== "" && userPassword.trim().length < 9) {
  //     setLoading(true);
  //     const userData = {
  //       displayName: userName,
  //       email: userEmail,
  //       password: userPassword,
  //       returnSecureToken: true,
  //     };
  //     const response = await sendUserData(userData);
  //     if (response?.data?.idToken) {
  //       Swal.fire({
  //         position: "center-center",
  //         icon: "success",
  //         title: "Your sign up is successfull",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       }).then(() => {
  //         onLogin(true);
  //         setItem("user", {
  //           userToken: response?.data?.idToken,
  //           email: response?.data?.email,
  //           userName: response?.data.displayName,
  //           userId: response?.data.localId,
  //         });
  //         navigator("/");
  //       });
  //     }
  //   }
  // };

  return (
    <div className="auth-contain">
      <div className="logo">
        <img
          src="https://management.agreemtechnologies.com/upload/large.png"
          alt=""
        />
      </div>
      <Card>
        <form>
          <label className="form-label">User Name</label>
          <Input
            type="text"
            name="userName"
            placeholder="Username"
            overrides={{
              Input: {
                style: ({ $theme }) => ({
                  height: "40px",
                }),
              },
            }}
          />
          {/* <p style={{ color: "red" }}>{userNameValidate}</p> */}
          <label className="form-label">Email</label>
          <Input
            type="email"
            name="userEmail"
            max={8}
            placeholder="name@example.com"

          />
          {/* <p style={{ color: "red" }}>{emailValidate}</p> */}
          <label className="form-label">password</label>
          <Input
            type="password"
            name="userPassword"
            placeholder="Password"
          />
          {/* <p style={{ color: "red" }}>{error ? error : passWordValidate}</p> */}
          <div className="mb-3 button-sign-up">
            <Button type="submit" classes="form-control authButton">

              "Sign up"

            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <NavLink to="/auth">Already user</NavLink>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
// {loading ? (
//   <div
//     className="spinner-border text-success"
//     role="status"
//   ></div>
// ) : (