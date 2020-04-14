import React from 'react'
import { useImmer } from 'use-immer'
import yaml from 'yaml'

export interface UseComponentBoardState {
  paths: { [componentId: string]: string }
  ids: string[]
}

const initialState: UseComponentBoardState = {
  paths: {},
  ids: [],
}

function useComponentBoard({ yml = '' }: any = {}) {
  const [state, setState] = useImmer(initialState)
  const ymlDoc = React.useRef<any>(yml ? yaml.parseDocument(yml) : '')

  React.useEffect(() => {
    ymlDoc.current = yaml.parseDocument(yml)
    // eslint-disable-next-line
  }, [yml])

  return {
    ...state,
    setState,
    ymlDoc,
  }
}

export default useComponentBoard
