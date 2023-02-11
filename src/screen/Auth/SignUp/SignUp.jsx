import React from "react";
import { SignUpSchema } from "helper/Validation";
import Button from "../../../components/Button/Button";
import Input from 'components/Input/Input';
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import "./Signup.css";
import "../auth.css";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { useAuthContext } from "context/AuthContext/AuthContext";

const SignUp = () => {

  const { error, onSignUp } = useAuthContext()
  const formilk = useFormik({
    initialValues: {
      email: "",
      password: "",
      profilePicture: "",
      userName: '',
      confirmPassword: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: (formValues) => {
      console.log(formValues);
      onSignUp(formValues.email, formValues.password)
    }
  });
  return (
    <div className="container-fluid auth">
      <div className="auth-contain">
        {!error && formilk.errors.email && formilk.touched.email && <ErrorMessage message={formilk.errors.email} />}
        {!error && !formilk.errors.email && formilk.errors.password && formilk.touched.password && <ErrorMessage message={formilk.errors.password} />}
        {!error && !formilk.errors.email && formilk.errors.userName && formilk.touched.userName && <ErrorMessage message={formilk.errors.userName} />}
        {!error && !formilk.errors.email && formilk.errors.confirmPassword && formilk.touched.confirmPassword && <ErrorMessage message={formilk.errors.confirmPassword} />}
        {error && <ErrorMessage message={error} />}
        <div className="logo">
          <img
            src="https://www.userlogos.org/files/logos/Mafia_Penguin/2-5.png"
            alt=""
          />
        </div>
        <form onSubmit={formilk.handleSubmit}>
          <div className="mb-2">
            <label className="form-label">User Name</label>
            <Input
              type="text"
              name="userName"
              placeholder="Username"
              formilk={formilk}
              value={formilk.values.userName}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Email</label>
            <Input
              type="email"
              name="email"
              max={8}
              formilk={formilk}
              value={formilk.values.email}
              placeholder="name@example.com"

            />
          </div>
          <div className="mb-2">
            <label className="form-label">password</label>
            <Input
              type="password"
              name="password"
              formilk={formilk}
              value={formilk.values.password}
              placeholder="Password"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              formilk={formilk}
              value={formilk.values.confirmPassword}
              placeholder="Confirm Password"
            />
          </div>
          <div className="mb-2 button-sign-up">
            <Button type="submit" classes="authButton btn btn-primary">
              Sign up
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <NavLink to="/auth">Already user</NavLink>
          </div>
        </form>

      </div>
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