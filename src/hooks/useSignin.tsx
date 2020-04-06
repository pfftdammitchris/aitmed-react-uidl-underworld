import React from 'react'
import { CountryCode } from 'libphonenumber-js'
import { prynote } from 'app/client'
import useVerificationCode from 'hooks/useVerificationCode'
import { isValidPhoneNumber, log } from 'utils'
import AuthContext from '../AuthContext'

export interface FormFieldIds {
  phoneNumber: string
  password: string
  countryCode?: CountryCode
  verificationCode?: string
}

export interface FormValues {
  phoneNumber: string | undefined
  password: string | undefined
  countryCode?: CountryCode
  verificationCode?: string
}

function useSignin({
  onVerificationCodeSent,
  onSigninSuccess,
  timeout = 15000,
}: any = {}) {
  const ctx = React.useContext(AuthContext)
  const { sendVerificationCode, ...verificationState } = useVerificationCode()

  // Options is an object of field names as properties and their html id as values
  function createOnSubmit(options: FormFieldIds) {
    if (options) {
      let msg = ''
      if (!('phoneNumber' in options)) {
        msg =
          'You created an onSubmit method without providing the "phoneNumber" key'
      } else if (!('password' in options)) {
        msg =
          'You created an onSubmit method without providing the "password" key'
      }
      if (msg) log({ msg, color: 'red' })
    }
    return function () {
      return onSubmit(options)
    }
  }

  async function onSubmit(fields: FormFieldIds) {
    try {
      const pendingVcode = ctx.verification.pending
      const node: {
        phoneNumber: null | HTMLInputElement
        password: null | HTMLInputElement
        verificationCode: null | HTMLInputElement
      } = {
        phoneNumber: document.getElementById(
          fields.phoneNumber,
        ) as HTMLInputElement,
        password: document.getElementById(fields.password) as HTMLInputElement,
        verificationCode: null,
      }
      if (fields.verificationCode) {
        node.verificationCode = document.getElementById(
          fields.verificationCode,
        ) as HTMLInputElement
      }
      const values: FormValues = {
        phoneNumber: node.phoneNumber?.value,
        password: node.password?.value,
      }
      await validate(values)
      if (node.verificationCode) {
        values.verificationCode = node.verificationCode?.value
      }
      log({ msg: 'onClickSignin', data: values, color: 'green' })
      // Invoke the required verification code step
      if (!pendingVcode) {
        ctx.setPendingVCode?.(true)
        await sendVerificationCode(values.phoneNumber || '')
        if (onVerificationCodeSent) onVerificationCodeSent(values)
      } else {
        if (pendingVcode) ctx.setPendingVCode?.(false)
        if (onSigninSuccess) onSigninSuccess()
      }
    } catch (error) {
      if (ctx.verification.pending) ctx.setPendingVCode?.(false)
      console.error(error)
    }
  }

  async function validate(
    {
      phoneNumber = '',
      password = '',
      verificationCode = '',
      countryCode = 'US',
    }: FormValues = { phoneNumber: '', password: '' },
  ) {
    if (!phoneNumber) {
      throw new Error('Phone number is required')
    }
    const phoneIsValid = await isValidPhoneNumber({
      phoneNumber: phoneNumber,
      country: countryCode,
    })
    let errMsg = ''
    if (!phoneIsValid) {
      errMsg =
        'Phone number format is invalid. Please use the format like: +1 1111111111'
    }
    if (!password) errMsg = 'Password is required'
    if (password.length < 8) {
      errMsg = 'Password must be at least 8 characters in length'
    }
    if (ctx.verification.pending) {
      if (!verificationCode) errMsg = 'Verification code is required'
    }
    if (errMsg) throw new Error(errMsg)
  }

  // async function onSubmit(values, callback, onError?: any) {
  //   try {
  //     const {
  //       phoneNumber = '',
  //       country = 'US',
  //       name = '',
  //       password = '',
  //       confirmPassword = '',
  //       verificationCode,
  //     } = values

  //     // Always keep the local state updated (this is a workaround because we're somehow
  //     //    losing the verificationCode value)
  //     if (verificationCode) {
  //       dispatch({ type: 'set-verification-code', code: verificationCode })
  //     }

  //     const formattedPhoneNum = await generatePhoneNumberForDatabase({
  //       phoneNumber,
  //       country,
  //     })

  //     const status = await prynote.account.getStatus()

  //     switch (status.code) {
  //       // Logged out state (User needs to enter their pw to log in)
  //       case 1: {
  //         const isValid = await isValidPhoneNumber({
  //           phoneNumber,
  //           country,
  //         })
  //         if (!isValid) {
  //           window.alert('The phoneNumber number is invalid')
  //           return
  //         }
  //         await prynote.account.loginByPassword(password)
  //         // redirect to dashboard
  //         callback()
  //         break
  //       }
  //       // New device (User needs to enter both their phoneNumber # and pw)
  //       case 2: {
  //         // User didn't enter their verification code yet
  //         //    or is creating a new account from the "UID not found" error
  //         if (!state.vCode.pending) {
  //           // Note: Don't ask for another code again since they already entered it successfully before
  //           if (state.creating) {
  //             if (password !== confirmPassword) {
  //               window.alert('Your passwords did not match. Please try again')
  //               return
  //             }
  //             if (!name) {
  //               window.alert('Please provide your name')
  //               return
  //             }
  //             await prynote.account.create(
  //               formattedPhoneNum,
  //               password,
  //               Number(verificationCode || state.vCode.code),
  //               name,
  //             )
  //             window.alert('Your account has been created')
  //             // redirect to dashboard
  //             callback()
  //           } else {
  //             // Initiating the first login process by sending the verification code
  //             setPendingVCode(true)
  //             if (verificationCodeRef.current) {
  //               verificationCodeRef.current.focus()
  //             }
  //             await sendVerificationCode(formattedPhoneNum)
  //           }
  //         }
  //         // Pending verification code
  //         else {
  //           await prynote.account.login(
  //             formattedPhoneNum,
  //             password,
  //             String(verificationCode || state.vCode.code),
  //           )
  //           // If the code gets here then the login was a success
  //           if (state.vCode.pending) {
  //             setPendingVCode(false)
  //           }
  //           // redifrect to dashboard
  //           callback()
  //         }
  //         break
  //       }
  //       default:
  //         break
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  return {
    createOnSubmit,
    onSubmit,
    verification: verificationState,
    sendVerificationCode,
  }
}

export default useSignin
