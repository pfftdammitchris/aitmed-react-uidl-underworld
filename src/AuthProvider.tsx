import React from 'react'
import AuthContext from './AuthContext'

export interface AuthContextValue extends AuthContextState {
  setAuthenticated?: (authenticated: boolean) => void
  setCreatingAccount?: (creating: boolean) => void
  setConfirmingPassword?: (confirming: boolean) => void
  setPendingVCode?: (pending: boolean) => void
  setVcode?: (code: string) => void
  setTimedOutVCode?: (timedOut: boolean) => void
  setErrorVCode?: (error: null | Error) => void
}

export type AppContextAction =
  | { type: 'set-authenticated'; authenticated: boolean }
  | { type: 'set-vcode'; code: string }
  | { type: 'set-vcode-in-process'; pending: boolean }
  | { type: 'set-vcode-timed-out'; timedOut: boolean }
  | { type: 'set-vcode-error'; error: null | Error }
  | { type: 'set-creating-in-process'; creating: boolean }
  | { type: 'set-creating-confirming-password'; confirming: boolean }

export interface AuthContextState {
  authenticated: boolean
  status: null | any
  verification: {
    code: null | string
    pending: boolean
    timedOut: boolean
    error: null | Error
  }
  creating: {
    pending: boolean
    confirmingPassword: boolean
  }
}

export const initialState: AuthContextState = {
  authenticated: false,
  status: null,
  verification: {
    code: null,
    pending: false,
    timedOut: false,
    error: null,
  },
  creating: {
    pending: false,
    confirmingPassword: false,
  },
}

function reducer(
  state: AuthContextState = initialState,
  action: AppContextAction,
): AuthContextState {
  switch (action.type) {
    case 'set-authenticated':
      return { ...state, authenticated: action.authenticated }
    case 'set-vcode':
      return {
        ...state,
        verification: { ...state.verification, code: action.code },
      }
    case 'set-vcode-in-process':
      return {
        ...state,
        verification: {
          ...state.verification,
          pending: action.pending,
          timedOut: false,
        },
      }
    case 'set-vcode-timed-out':
      return {
        ...state,
        verification: { ...state.verification, timedOut: action.timedOut },
      }
    case 'set-vcode-error':
      return {
        ...state,
        verification: { ...state.verification, error: action.error },
      }
    case 'set-creating-in-process':
      return {
        ...state,
        creating: { ...state.creating, pending: action.creating },
      }
    case 'set-creating-confirming-password':
      return {
        ...state,
        creating: { ...state.creating, confirmingPassword: action.confirming },
      }
    default:
      return state
  }
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  function setAuthenticated(authenticated: boolean) {
    dispatch({ type: 'set-authenticated', authenticated })
  }

  function setVcode(code: string) {
    dispatch({ type: 'set-vcode', code })
  }

  function setPendingVCode(pending: boolean) {
    dispatch({ type: 'set-vcode-in-process', pending })
  }

  function setTimedOutVCode(timedOut: boolean) {
    dispatch({ type: 'set-vcode-timed-out', timedOut })
  }

  function setErrorVCode(err: null | Error) {
    dispatch({ type: 'set-vcode-error', error: err })
  }

  function setCreatingAccount(creating: boolean) {
    dispatch({ type: 'set-creating-in-process', creating })
  }

  function setConfirmingPassword(confirming: boolean) {
    dispatch({ type: 'set-creating-confirming-password', confirming })
  }

  // Keep the authenticated state in sync with status
  React.useEffect(() => {
    if (!state.authenticated && state.status?.code === 0) {
      // setAuthenticated(true)
    }
  }, [state.authenticated, state.status])

  const ctx: AuthContextValue = {
    ...state,
    setAuthenticated,
    setCreatingAccount,
    setConfirmingPassword,
    setVcode,
    setPendingVCode,
    setTimedOutVCode,
    setErrorVCode,
  }

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export default AppProvider
