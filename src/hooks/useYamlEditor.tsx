// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'
import { useImmer } from 'use-immer'

export interface UseYamlEditorOptions {
  initialValue?: string
  delay?: number
}

const initialState = {
  yml: '',
  cache: {},
}

function useYamlEditor({
  initialValue = '',
  delay: delayProp = 50,
}: UseYamlEditorOptions) {
  const [state, setState] = useImmer(initialState)
  const [delay, setDelay] = React.useState(delayProp)

  function setYml(e: React.ChangeEvent<HTMLInputElement> | string) {
    // Caller is directly using a YAML string
    if (typeof e === 'string') {
      if (e !== state.yml) {
        setState((draft) => {
          draft.yml = e
        })
      }
    } else {
      e.persist()
      if (e.target.value !== state.yml) {
        setState((draft) => {
          draft.yml = e.target.value
        })
      }
    }
  }

  // Initiates the state
  React.useEffect(() => {
    if (initialValue) {
      setState((draft) => {
        draft.yml = initialValue
      })
    }
    // eslint-disable-next-line
  }, [initialValue])

  return {
    ...state,
    delay,
    setDelay,
    setYml,
  }
}

export default useYamlEditor
