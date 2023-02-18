import React, { useState, useEffect, Fragment } from "react";
import { SignUpSchema } from "helper/Validation";
import Button from "../../../components/Button/Button";
import Input from 'components/Input/Input';
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import "./Signup.css";
import "../auth.css";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { logo, useAuthContext } from "context/AuthContext/AuthContext";
export const initalUrl = "https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280.jpg"

interface SignUpFormValue {
  email: string,
  password: string,
  profilePicture: File | string,
  userName: string,
  confirmPassword: string
}
const SignUp = () => {
  const [profilePictureUrl, setProfilePicureUrl] = useState<string | null>(initalUrl)
  const { error, onSignUp, isLoading } = useAuthContext()
  const formilk = useFormik<SignUpFormValue>({
    initialValues: {
      email: "",
      password: "",
      profilePicture: '',
      userName: '',
      confirmPassword: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: (formValues) => {
      const payload = {
        email: formValues.email,
        password: formValues.password,
        pictureUrl: profilePictureUrl || '',
        displayName: formValues.userName
      }
      onSignUp(payload)
    }
  });

  useEffect(() => {
    if (formilk.values.profilePicture) {
      const fileResult: File = formilk.values.profilePicture as File
      var reader = new FileReader();
      reader.onloadend = function () {
        const result = reader.result as string
        setProfilePicureUrl(result);
      }
      reader.readAsDataURL(fileResult)
    }

  }, [formilk.values.profilePicture])

  const handlerChange = (e: React.BaseSyntheticEvent) => {
    formilk.setFieldValue('profilePicture', e.target.files[0]);
  }

  return (
    <Fragment>
      <div className="auth-contain">
        {!error && formilk.errors.email && formilk.touched.email && <ErrorMessage message={formilk.errors.email} />}
        {!error && !formilk.errors.email && formilk.errors.password && formilk.touched.password && <ErrorMessage message={formilk.errors.password} />}
        {!error && !formilk.errors.email && formilk.errors.userName && formilk.touched.userName && <ErrorMessage message={formilk.errors.userName} />}
        {!error && !formilk.errors.email && formilk.errors.confirmPassword && formilk.touched.confirmPassword && <ErrorMessage message={formilk.errors.confirmPassword} />}
        {error && <ErrorMessage message={error} />}
        <div className="logo">
          <img
            src={logo}
            alt=""
          />
        </div>
        <form onSubmit={formilk.handleSubmit}>
          <div className="mb-0 form-image-input">
            <label className="form-label" htmlFor="profilePicture">
              <img
                src={profilePictureUrl || ''}
                alt=""
                width={80}
                height={80}
              />

            </label>

            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              placeholder="profilePicture"
              onChange={(e) => handlerChange(e)}
            />

          </div>

          <br></br>
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
            <Button disable={isLoading} type="submit" classes="authButton btn btn-primary">
              Sign up
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <NavLink to="/auth">Already user</NavLink>
          </div>
        </form>

      </div>
    </Fragment>
  );
};

export default SignUp;
