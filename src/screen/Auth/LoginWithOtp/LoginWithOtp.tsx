import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from '../../../components/Input/Input'
import "../auth.css";
import { useFormik } from "formik";
import './LoginWithOtp.css';
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { logo, useAuthContext } from "context/AuthContext/AuthContext";
import { isPhoneNumberAndOtpValid, SignInPageWithOtpSchema } from "../../../helper/Validation";
import { SignInWithOtpFormValues } from "Modal/Modal";
import { VeriflyOtpFormValues } from "Modal/Modal";
import { Fragment } from 'react'
import { VeriflyOtpSchema } from "helper/Validation";
import { setItem } from "helper/Storage";

const LoginWithOtp = () => {
    const { isLoading, error, setUpRecaptcha, setError, setLoading } = useAuthContext();
    const [confirmObj, setConfirmObj] = useState<any>({})
    const navigator = useNavigate();
    const [flag, setFlag] = useState<boolean>(false);
    const formilk = useFormik<SignInWithOtpFormValues>({
        initialValues: {
            phoneNumber: '',
        },
        validationSchema: SignInPageWithOtpSchema,
        onSubmit: async (formValues) => {
            const { isValid, error } = isPhoneNumberAndOtpValid(formValues.phoneNumber, "Phone number");
            if (isValid) {
                try {
                    const response = await setUpRecaptcha(formValues.phoneNumber);
                    setConfirmObj(response)
                    setFlag(true)
                } catch (error) {

                    setError("Please enter valid phone number");
                    setLoading(false)
                }
            }
            else {
                setError(error);
            }

        }
    });

    const veriflyOtpFormilk = useFormik<VeriflyOtpFormValues>({
        initialValues: {
            otp: '',
        },
        validationSchema: VeriflyOtpSchema,
        onSubmit: async (formValues) => {
            const { isValid, error } = isPhoneNumberAndOtpValid(formValues.otp, "OTPI");
            if (isValid) {
                const otp = Number(formValues.otp);
                try {
                    const confrimResponse = await confirmObj.confirm(otp)
                    setItem('user', confrimResponse.user)
                    navigator('/');
                } catch (err: any) {
                    setError("Please enter valid otp number");
                }
            }
            else {
                setError(error)
            }
        }
    });

    const { phoneNumber } = formilk.values;
    const { otp } = veriflyOtpFormilk.values;
    useEffect(() => {
        setError('');
    }, [otp, phoneNumber, setError]);

    return (

        <Fragment>
            <div className="auth-contain">
                {!error && formilk.errors.phoneNumber && formilk.touched.phoneNumber && <ErrorMessage message={formilk.errors.phoneNumber} />}
                {!error && veriflyOtpFormilk.errors.otp && veriflyOtpFormilk.touched.otp && <ErrorMessage message={veriflyOtpFormilk.errors.otp} />}
                {error && <ErrorMessage message={error} />}
                <div className="logo">
                    <img
                        src={logo}
                        alt=""
                    />
                </div>
                {flag ? <Fragment>

                    <form onSubmit={veriflyOtpFormilk.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Verifly otp</label>

                            <div className="input-block">
                                <Input
                                    type="text"
                                    id="otp"
                                    className="form-control"
                                    value={veriflyOtpFormilk.values.otp}
                                    placeholder="Ente otp"
                                    name="otp"
                                    formilk={veriflyOtpFormilk}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <Button disable={isLoading} type="submit" classes="authButton btn btn-primary">
                                {isLoading ? <div className="spinner-border" role="status" /> : "Send Otp"}
                            </Button>
                        </div>
                    </form>
                </Fragment>
                    : (
                        <form onSubmit={formilk.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <div className="form-control  input-container">
                                    <div className="country-code  form-control">+91</div>
                                    <div className="input-block">
                                        <Input
                                            type="text"
                                            id="phoneNumber"
                                            className="form-control"
                                            value={formilk.values.phoneNumber}
                                            placeholder="Phone number"
                                            name="phoneNumber"
                                            formilk={formilk}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3" id="recaptcha-container">
                            </div>
                            <div className="mt-3">
                                <Button disable={isLoading} type="submit" classes="authButton btn btn-primary">
                                    {isLoading ? <div className="spinner-border" role="status" /> : "Send Otp"}
                                </Button>
                            </div>


                        </form>
                    )}
                <div className="mt-3">
                    <Button onClick={() => navigator('/login')} disable={isLoading} type="button" classes="authButton btn btn-success">
                        Back
                    </Button>
                    <div style={{ textAlign: "center" }}>
                        <NavLink to="/signUp">Register Here</NavLink>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default LoginWithOtp;
