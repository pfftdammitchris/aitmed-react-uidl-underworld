import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  UIDLEndpointConfig,
  UIDLBaseCSS,
  UIDLBasePage,
} from '@aitmed/react-uidl'
import useSignin from 'hooks/useSignin'
import { log } from 'utils'
import { prynote } from 'app/client'
import useCurrentPage from './useCurrentPage'
import AppContext from '../AppContext'
import AuthContext from '../AuthContext'

export type UseUIDLAction =
  | { type: 'set-current-page'; currentPage: any }
  | {
      type: 'set-state'
      initiated?: boolean
      config?: UIDLEndpointConfig
      baseCss?: UIDLBaseCSS
      basePage?: UIDLBasePage
    }
  | { type: 'set-values'; values: any }
  | { type: 'set-initiated'; initiated: boolean }

export interface UseUIDLState {
  initiated: boolean
  config: null | UIDLEndpointConfig
  baseCss: null | UIDLBaseCSS
  basePage: null | UIDLBasePage
  values: any
}

const initialState: UseUIDLState = {
  initiated: false,
  config: null,
  baseCss: null,
  basePage: null,
  values: {},
}

function reducer(
  state: UseUIDLState = initialState,
  action: UseUIDLAction,
): UseUIDLState {
  switch (action.type) {
    case 'set-initiated':
      return { ...state, initiated: action.initiated }
    case 'set-state': {
      const { type, ...rest } = action
      return { ...state, ...rest }
    }
    case 'set-values':
      return { ...state, values: action.values }
    default:
      return state
  }
}

function useUIDL(
  {
    location = {},
    baseUrl: baseUrlProp = 'https://public.aitmed.com/alpha/', // temp prop
    uidlEndpoint = '',
    paths = {},
  }: {
    location?: { hostname?: string; pathname?: string; search?: any }
    baseUrl?: string
    uidlEndpoint: string
    paths: { [key: string]: string }
  } = { uidlEndpoint: '', paths: {} },
) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { page: currentPage, setPage } = useCurrentPage({ page: null })
  const { push: navigate, goBack, goForward } = useHistory()
  const params = useParams<{ page?: string }>()
  const appCtx = React.useContext(AppContext)

  const { createOnSubmit: createOnSigninSubmit } = useSignin({
    onVerificationCodeSent: ({ phoneNumber }: any = {}) =>
      appCtx?.openModal?.({
        name: 'verification.code',
        title: 'Verification Code',
        subtitle: `Please input the verification code we sent to: ${phoneNumber}`,
      }),
    onSigninSuccess: () => {
      navigate('/5_Dashboard')
      appCtx?.closeModal?.()
    },
  })

  const createUrl = React.useCallback(
    (path: string, locale: string = '') => `${baseUrlProp}${path}${locale}.yml`,
    [baseUrlProp],
  )

  function onClickDashboard() {
    navigate(`/${paths.dashboard}`)
  }

  function onClickVerificationCode() {
    navigate(`/${paths.verificationCode}`)
  }

  // Initiate the UI
  React.useEffect(() => {
    async function fetchUIDL() {
      try {
        const config = await prynote.uidl.getUIDL(uidlEndpoint)
        const { baseUrl, startPage } = config
        const reqUris = [
          `${baseUrl}${paths.baseCss}.yml`,
          `${baseUrl}${paths.basePage}_en.yml`,
        ]
        if (paths.current) {
          reqUris.push(`${baseUrl}${paths.current}_en.yml`)
        } else {
          reqUris.push(`${baseUrl}${startPage}_en.yml`)
        }
        const reqs = reqUris.map((uri: string) => prynote.uidl.getUIDL(uri))
        const [baseCss, basePage, fetchedPage] = await Promise.all(reqs)
        if (fetchedPage) {
          setPage(fetchedPage)
          dispatch({
            type: 'set-state',
            config,
            baseCss,
            basePage,
          })
        }
        try {
          window.localStorage.setItem(
            paths.current,
            JSON.stringify(fetchedPage),
          )
        } catch (err) {
          console.error(err)
          toast.error(err.message)
        }
      } catch (error) {
        console.error(error)
        toast.error(error.message)
      }
    }
    if (!state.initiated && uidlEndpoint) {
      fetchUIDL()
      dispatch({ type: 'set-initiated', initiated: true })
    }
  }, [currentPage, paths, setPage, state.initiated, uidlEndpoint])

  // Keeps UI updating as the route updates
  React.useEffect(() => {
    const pagePath = params.page
    if (pagePath) {
      // const pagePath = params?.page || ''
      const locale = '_en'
      let page: any = window.localStorage.getItem(pagePath)
      try {
        // Check if they have it stored in cache. Use it if so
        page = JSON.parse(page)
      } catch (err) {
        console.error(err)
      } finally {
        if (!page) {
          // Fetch a fresh page from server
          prynote.uidl
            .getUIDL(createUrl(pagePath, locale))
            .then((newPage) => {
              if (newPage) {
                log({
                  msg: 'Fetched new page',
                  color: 'magenta',
                  data: newPage,
                })
              }
              setPage(newPage)
            })
            .catch((err) => {
              console.error(err)
              toast.error(`Error: ${err.message}`)
            })
        } else {
          setPage(page)
        }
      }
    }
  }, [createUrl, params, setPage])

  return {
    ...state,
    currentPage,
    onClickDashboard,
    onClickVerificationCode,
    createOnSigninSubmit,
  }
}

export default useUIDL
