import React from 'react'
import { UIDLComponent, UIDLPage } from '../types'

export type UseCurrentPageAction =
  | {
      type: 'set-state'
      state: Partial<UseCurrentPageState>
    }
  | { type: 'set-page'; page: UIDLPage }

export interface UseCurrentPageState {
  page: null | UIDLPage
}

export interface UseCurrentPageOptions {
  page: null | UIDLPage
}

const initialState: UseCurrentPageState = {
  page: null,
}

function reducer(
  state = initialState,
  action: UseCurrentPageAction,
): UseCurrentPageState {
  switch (action.type) {
    case 'set-state':
      return { ...state, ...action.state }
    case 'set-page':
      return { ...state, page: action.page }
    default:
      return state
  }
}

function useCurrentPage({ page }: UseCurrentPageOptions) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const pageToStateObject = React.useCallback(
    function (_page): Partial<UseCurrentPageState> {
      if (!_page) return {}
      const result: any = {
        page: { ...state.page },
      }
      if (_page['pageName']) result.page.pageName = _page.pageName
      if (_page['dataModel']) result.page.dataModel = _page.dataModel
      if (Array.isArray(_page['components'])) {
        result.componentIds = []
        result.page['components'] = _page.components
        _page.components.forEach((component: UIDLComponent) => {
          const { componentId } = component
          if (componentId) result.componentIds.push(componentId)
        })
      }
      return result
    },
    [state.page],
  )

  const setPage = React.useCallback(
    (newPage: UIDLPage) => dispatch({ type: 'set-page', page: newPage }),
    [],
  )

  React.useEffect(() => {
    if (page) {
      dispatch({ type: 'set-state', state: pageToStateObject(page) })
    }
  }, [page, pageToStateObject])

  return {
    ...state,
    pageToStateObject,
    setPage,
  }
}

export default useCurrentPage
