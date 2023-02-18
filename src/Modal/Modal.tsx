import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
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

export interface SideBarItemProps {
    title: string
    onclick?: () => void
    path?: string
    icon: IconProp
}

export interface SideBarSubItemProps {
    list: {
        title: string
        path: string
        icon: IconProp
    }[]
    label: string
}

export interface HeaderProps {
    name:string
    url:string
}