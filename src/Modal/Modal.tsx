import React, { SetStateAction } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FormikProps } from "formik";
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
    onToggle?: () => void
    icon: IconProp
}

export interface SideBarSubItemProps {
    list: {
        title: string
        path: string
        icon: IconProp
    }[]
    onToggle: () => void
    label: string
}

export interface HeaderProps {
    name: string
    url: string
}
export interface UserProfileDetails {
    displayName: string
    photoURL: string
}

export interface MonthWiseExpenseState {

}

export interface MonthWiseData {
    data: {
        x: string
        y: string
    }[]
}
export interface ExpenseState {
    id?: string
    name: string
    category: string
    note: string,
    amount: string
    month: string
}
export interface MonthlyChartProp {
    id: string
    seriesName: string
    monthlyChartData: number[]
    data: ExpenseState[]
    setMontlyChartData: React.Dispatch<SetStateAction<number[]>>
}
export interface DashBoardListProps {
    data: any
}
export interface MonthWiseSumKey {
    [index: string]: any
}
export interface CategoryFormValues {
    name: string
    type: string
}

export interface addCategoryPayLoad {
    icon: string
    name: string
    type: string
}

export interface editCategoryPayLoad {
    icon: string
    name: string
    type: string

}
export interface BackIconProps {
    path: string
}

export interface ViewRowContainProps {
    label: string
    value: string
}

export interface LoaderProps {
    className?: string
}

export interface IncomeFormValues {
    name: string
    categoryName: string
    income: string | number
    note: string
}

export interface TextAreaProps {
    name: string
    placeHolder: string
    className?: string
    id: string
    formilk: FormikProps<IncomeFormValues>
    value: string
}