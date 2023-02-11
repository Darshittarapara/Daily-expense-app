import React from "react";

export interface LayOutProps {
    component: React.ElementType
}
export interface ErrorMessageProps {
    message: string
}
export interface SignInWithOtpFormValues {
    phoneNumber: number
}
export interface VeriflyOtpFormValues {
    otp: number
}