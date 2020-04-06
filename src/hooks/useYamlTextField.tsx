// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'
import yaml from 'yaml'
import { useImmer } from 'use-immer'

function useYamlTextField({ initialValue = '' }) {
  const [{ value: yml }, _setYmlState] = useImmer({ value: initialValue })
  const [parsedYml, setParsedYml] = React.useState(
    initialValue ? yaml.parse(initialValue) : {},
  )

  function setYml(e: React.ChangeEvent<HTMLInputElement> | string) {
    // Caller is directly using a YAML string
    if (typeof e === 'string') {
      if (e !== yml) {
        _setYmlState((draft) => {
          draft.value = e
        })
        setParsedYml(yaml.parse(e))
      }
    } else {
      e.persist()
      // Text field
      _setYmlState((draft) => {
        draft.value = e.target.value
      })
      setParsedYml(yaml.parse(e.target.value))
    }
  }

  return {
    yml,
    parsedYml,
    setYml,
    setParsedYml,
  }
}

export default useYamlTextField
