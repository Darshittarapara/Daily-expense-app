import * as Yup from 'yup'
export const checkBlankUserInput = (value: string) => {
    return value.trim().length === 0 ? true : false
}

export const authErrorHandler = (message: string) => {
    if (message.includes("user-not-found")) {
        return "Please register your account"
    }
    else if (message.includes("wrong-password")) {
        return "Please check your password"
    }
    else {
        return "Too Many attempts please reset your password"
    }
}

export const SignInPageSchema = Yup.object({
    email: Yup.string()
        .required('Please enter email')
        .email('Please enter valid email address'),
    password: Yup.string()
        .required('Please enter password')
        .min(5, "Please enter minimum 5 characters")
        .max(10, "Please enter maximum 10 characters")
})

export const SignInPageWithOtpSchema = Yup.object({
    phoneNumber: Yup.string()
        .required("Please enter your phone number")
        .max(10, "Phone number must be less than 10")
        .min(10, "Phone number must be 10 characters")
})


export const VeriflyOtpSchema = Yup.object({
    otp: Yup.string()
        .required("Please enter otp")
        .max(6, "Phone number must be 6 characters")
        .min(6, "Phone number must be 6 characters")
})

export const SignUpSchema = Yup.object({
    email: Yup.string()
        .required('Please enter email')
        .email('Please enter valid email address'),
    password: Yup.string()
        .required('Please enter password')
        .min(5, "Please enter minimum 5 characters")
        .max(10, "Please enter maximum 10 characters"),
    confirmPassword: Yup.string()
        .required('Please enter confirm password')
        .min(5, "Please enter minimum 5 characters")
        .max(10, "Please enter maximum 10 characters"),
    userName: Yup.string()
        .required("please enter user name")
})

export const isPhoneNumberAndOtpValid = (value: string, label: string) => {
    let isValid = true;
    value.split('').forEach((character: any) => {
        if (isNaN(character)) {
            isValid = false
        }
    })

    return { isValid, error: `${label} must be number` }
}