import React from 'react'
import { useImmer } from 'use-immer'

export interface UseUIDLOptions {
  baseCss: any
  basePage: any
  page: any
  vw: any
  vh: any
}

export interface UseUIDLState {
  initiated: ('css' | 'page')[]
  baseCss: null | any
  basePage: null | any
  page: null | any
}

const initialState: UseUIDLState = {
  initiated: [],
  baseCss: null,
  basePage: null,
  page: null,
}

function useUIDL({
  baseCss: baseCssProp,
  basePage: basePageProp,
  page: pageProp,
  vw,
  vh,
}: UseUIDLOptions) {
  const [state, setState] = useImmer(initialState)

  function incrementBy(value: any, componentIds: string[]) {
    //
  }

  React.useEffect(() => {
    setState((draft) => {
      if (baseCssProp && !state.initiated.includes('css')) {
        draft.baseCss = baseCssProp
        draft.initiated.push('css')
      }
      if (!state.basePage && basePageProp) {
        draft.basePage = basePageProp
      }
      if (pageProp && !state.initiated.includes('page')) {
        draft.page = pageProp
        draft.initiated.push('page')
      }
    })
  }, [
    baseCssProp,
    basePageProp,
    pageProp,
    setState,
    state.basePage,
    state.initiated,
  ])

  return {
    ...state,
  }
}

export default useUIDL
