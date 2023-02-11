import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from '../../../components/Input/Input'
import "../auth.css";
import { useFormik } from "formik";
import { SignInPageSchema } from "../../../helper/Validation";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { useAuthContext } from "context/AuthContext/AuthContext";
const Login = () => {
  const navigator = useNavigate();
  const { onLogin, isLoading, setError, error } = useAuthContext();
  const formilk = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: SignInPageSchema,
    onSubmit: (formValues) => {
      onLogin(formValues.email, formValues.password)
    }
  });

  const { email, password } = formilk.values;
  useEffect(() => {
    setError('');
  }, [email, password, setError])
  return (
    <div className="container-fluid auth">
      <div className="auth-contain">
        {!error && formilk.errors.email && formilk.touched.email && <ErrorMessage message={formilk.errors.email} />}
        {!error && !formilk.errors.email && formilk.errors.password && formilk.touched.password && <ErrorMessage message={formilk.errors.password} />}
        {error && <ErrorMessage message={error} />}
        <div className="logo">
          <img
            src="https://www.userlogos.org/files/logos/Mafia_Penguin/2-5.png"
            alt=""
          />
        </div>

        <form onSubmit={formilk.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <Input
              type="email"
              id="email"
              className="form-control"
              placeholder="name@example.com"
              name="email"
              value={formilk.values.email}
              formilk={formilk}
            />

          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <Input
              type="password"
              id="password"
              formilk={formilk}
              name="password"
              className="form-control"
              placeholder="Password"
              value={formilk.values.password}
            />

          </div>
          <div className="mt-3">
            <Button disable={isLoading} type="submit" classes="authButton btn btn-primary">
              {isLoading ? <div className="spinner-border" role="status" /> : "Login"}
            </Button>
          </div>
          <div className="mt-3">
            <Button disable={isLoading} onClick = {() => navigator("/auth/login-with-otp")} type="submit" classes="authButton btn btn-success">
              Sign In with Otp
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <NavLink to="/auth/signup">Register Here</NavLink>
          </div>
        </form>

      </div>
    </div>

  );
};

export default Login;
