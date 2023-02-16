import React from "react";

export interface LayOutProps {
    component: React.ElementType
}
export interface ErrorMessageProps {
    message: string
}
export interface SignInWithOtpFormValues {
    phoneNumber: string
}
export interface VeriflyOtpFormValues {
    otp: string
}

export interface SignUpSubmitPayLoad {
    email: string
    password: string,
    pictureUrl: string
    displayName: string
}