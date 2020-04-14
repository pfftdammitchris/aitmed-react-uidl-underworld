// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'
import { useImmer } from 'use-immer'
import yaml from 'yaml'

export interface UseYamlEditorOptions {
  initialValue?: string
}

const initialState = {
  yml: '',
  parsedYml: null,
}

function useYamlEditor({ initialValue = '' }: UseYamlEditorOptions) {
  const [state, setState] = useImmer(initialState)

  function parse(yml: string) {
    try {
      return yaml.parse(yml)
    } catch (error) {
      console.error(error)
      return yml
    }
  }

  function onYmlChange(e: React.ChangeEvent<HTMLInputElement> | string) {
    // Caller is directly using a YAML string
    if (typeof e === 'string') {
      if (e !== state.yml) {
        setState((draft) => {
          draft.yml = e
          const parsedYml = parse(e)
          if (parsedYml) draft.parsedYml = parsedYml
        })
      }
    } else {
      e.persist()
      if (e.target.value !== state.yml) {
        setState((draft) => {
          draft.yml = e.target.value
          const parsedYml = parse(e.target.value)
          if (parsedYml) draft.parsedYml = parsedYml
        })
      }
    }
  }

  // Initiates the state
  React.useEffect(() => {
    if (initialValue) {
      setState((draft) => {
        draft.yml = initialValue
        const parsedYml = parse(initialValue)
        if (parsedYml) draft.parsedYml = parsedYml
      })
    }
    // eslint-disable-next-line
  }, [initialValue])

  return {
    ...state,
    onYmlChange,
  }
}

export default useYamlEditor
