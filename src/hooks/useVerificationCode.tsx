import React from 'react'
import { prynote } from 'app/client'
import AuthContext from '../AuthContext'

function useVerificationCode({ timeout = 15000 } = {}) {
  const {
    verification,
    setVcode,
    setPendingVCode,
    setErrorVCode,
    setTimedOutVCode,
  } = React.useContext(AuthContext)
  const timeoutRef = React.useRef<any>(null)

  async function sendVerificationCode(formattedPhoneNum: string) {
    try {
      clearTimeout(timeoutRef.current)

      if (verification.timedOut) {
        setTimedOutVCode?.(false)
      }
      if (verification.error) {
        setErrorVCode?.(null)
      }

      timeoutRef.current = setTimeout(() => {
        setTimedOutVCode?.(true)
      }, timeout)

      if (!verification.pending) setPendingVCode?.(true)

      const result = await prynote.account.requestVerificationCode(
        formattedPhoneNum,
      )

      setPendingVCode?.(false)

      if (result) {
        setVcode?.(result)
      }

      clearTimeout(timeoutRef.current)
      return result
    } catch (error) {
      console.error(error)
      setPendingVCode?.(false)
      setErrorVCode?.(error)
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    const timedOutMsg =
      'We did not receive a response from the server. Please try again later.'
    if (verification.timedOut && verification.error?.message !== timedOutMsg) {
      if (verification.pending) setPendingVCode?.(false)

      setErrorVCode?.(new Error(timedOutMsg))
    }
  }, [
    setErrorVCode,
    setPendingVCode,
    verification.error,
    verification.pending,
    verification.timedOut,
  ])

  return {
    ...verification,
    sendVerificationCode,
  }
}

export default useVerificationCode
