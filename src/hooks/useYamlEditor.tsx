// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'
import {
  normalizeBorderAttrs,
  normalizeColorAttrs,
  normalizeFontAttrs,
  normalizePositionAttrs,
  normalizeStyleAttrs,
  prepareAssetUrl,
  resolveAliases,
  resolveAligns,
  resolveChildren,
  resolveClassNames,
  resolvePositionAttrs,
  resolveSizeAttrs,
  resolveStyles,
  resolveTagName,
} from '@aitmed/react-uidl'
import yaml from 'yaml'
import { useImmer } from 'use-immer'

const initialState = {
  yml: '',
  parsedYml: {},
}

function useYamlEditor({ initialValue = '', delay: delayProp = 50 }) {
  const [state, setState] = useImmer(initialState)
  const [delay, setDelay] = React.useState(delayProp)

  function parseYml(yml: string) {
    try {
      return yaml.parse(yml)
    } catch (error) {
      console.error(error)
      return yml
    }
  }

  /** Parses a string of YML
   * @param { string } yml - Yaml string
   */
  function setYml(e: React.ChangeEvent<HTMLInputElement> | string) {
    // Caller is directly using a YAML string
    if (typeof e === 'string') {
      if (e !== state.yml) {
        setState((draft) => {
          draft.yml = e
          draft.parsedYml = parseYml(e)
        })
      }
    } else {
      e.persist()
      if (e.target.value !== state.yml) {
        setState((draft) => {
          draft.yml = e.target.value
          draft.parsedYml = parseYml(e.target.value)
        })
      }
    }
  }

  React.useEffect(() => {
    if (initialValue) {
      setState((draft) => {
        const parsedYml = yaml.parse(initialValue)
        draft.yml = initialValue
        draft.parsedYml = parsedYml
      })
    }
  }, [initialValue, setState])

  return {
    ...state,
    delay,
    setDelay,
    setYml,
  }
}

export default useYamlEditor
