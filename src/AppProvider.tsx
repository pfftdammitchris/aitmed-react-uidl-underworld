import React from 'react'
import { BaseCSS } from '@aitmed/react-uidl'
import { log } from 'utils'
import AppContext from './AppContext'
import AuthContext from './AuthContext'

export interface AppContextModalState {
  name: string
  opened: boolean
  title: string
  subtitle: string
}

export interface AppContextValue extends AppContextState {
  openModal?: (options?: Partial<AppContextModalState>) => void
  closeModal?: (options?: Partial<AppContextModalState>) => void
  setCss?: (css?: null | BaseCSS) => void
}

export type AppContextAction =
  | { type: 'open-modal'; modal?: any }
  | { type: 'close-modal'; modal?: any }
  | { type: 'set-css'; css: null | BaseCSS }

export interface AppContextState {
  modal: AppContextModalState
  css: null | BaseCSS
}

export const initialState: AppContextState = {
  modal: {
    name: '',
    opened: false,
    title: '',
    subtitle: '',
  },
  css: null,
}

function reducer(
  state: AppContextState = initialState,
  action: AppContextAction,
): AppContextState {
  switch (action.type) {
    case 'open-modal':
      return {
        ...state,
        modal: { ...state.modal, ...action.modal, opened: true },
      }
    case 'close-modal':
      return {
        ...state,
        modal: { ...state.modal, ...action.modal, opened: false },
      }
    case 'set-css':
      return { ...state, css: action.css }
    default:
      return state
  }
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const authCtx = React.useContext(AuthContext)

  function openModal(options?: Partial<AppContextModalState>) {
    dispatch({ type: 'open-modal', modal: options })
  }

  function closeModal(options?: Partial<AppContextModalState>) {
    dispatch({ type: 'close-modal', modal: options })
  }

  function setCss(css: null | BaseCSS = null) {
    dispatch({ type: 'set-css', css: css })
  }

  // Keep the authenticated state in sync with status
  React.useEffect(() => {
    if (authCtx && !authCtx.authenticated && authCtx.status?.code === 0) {
      // setAuthenticated(true)
    }
  }, [authCtx])

  React.useEffect(() => {
    log({
      msg: 'AppProviderState:',
      data: state,
      color: 'olive',
    })
  }, [state])

  const ctx = {
    ...state,
    openModal,
    closeModal,
    setCss,
  }

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
}

export default AppProvider
