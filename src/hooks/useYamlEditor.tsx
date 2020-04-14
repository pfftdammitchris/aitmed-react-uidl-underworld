// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'
import {
  EditorState,
  convertToRaw,
  getDefaultKeyBinding,
  RichUtils,
} from 'draft-js'
import CodeUtils from 'draft-js-code'

export interface UseYamlEditorOptions {
  yml: string
  setYml: (yml: string) => any
  delay?: number
}

function useYamlEditor({
  yml,
  setYml,
  delay: delayProp = 50,
}: UseYamlEditorOptions) {
  const [delay, setDelay] = React.useState(delayProp)

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  )

  function onChange(nextEditorState: EditorState) {
    const contentState = nextEditorState.getCurrentContent()
    console.log(contentState)
    setEditorState(nextEditorState)
  }

  /**
   * @param { string } command - Key command
   */
  function handleKeyCommand(command: string) {
    let newState

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command)
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
      onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  function keyBindingFn(e: React.KeyboardEvent<any>) {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return getDefaultKeyBinding(e)
    }

    const command = CodeUtils.getKeyBinding(e)

    return command || getDefaultKeyBinding(e)
  }

  /** Detects and persists indentation when enter is pressed
   * @param { object } e - Event object
   */
  function handleReturn(e: React.KeyboardEvent<any>) {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return 'not-handled'
    }

    onChange(CodeUtils.handleReturn(e, editorState))

    return 'handled'
  }

  /** If the selection is inside a code block, it adds two spaces
   * @param { object } e - Event object
   */
  function onTab(e: React.KeyboardEvent<any>) {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return 'not-handled'
    }

    onChange(CodeUtils.onTab(e, editorState))

    return 'handled'
  }

  // // When yml is being updated, this keeps editorState consistently updated
  // //   to synchronize with the changes
  // React.useEffect(() => {
  //   console.log('useEffect yml syncronization')
  //   const contentState = editorState.getCurrentContent()
  //   // eslint-disable-next-line
  // }, [])

  return {
    editorState,
    onChange,
    keyBindingFn,
    handleKeyCommand,
    handleReturn,
    onTab,
    delay,
    setDelay,
  }
}

export default useYamlEditor

/*
// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'

export interface UseYamlEditorOptions {
  yml: string
  setYml: (yml: any) => any
  delay?: number
}

function useYamlEditor({
  yml,
  setYml,
  delay: delayProp = 50,
}: UseYamlEditorOptions) {
  const [delay, setDelay] = React.useState(delayProp)

  const onChange = React.useCallback(
    function onChange(e: React.ChangeEvent<any>) {
      console.log(window.getSelection())
      setYml(e)
    },
    [setYml],
  )

  // When yml is being updated, this keeps editorState consistently updated
  //   to synchronize with the changes
  React.useEffect(() => {
    // eslint-disable-next-line
  }, [yml])

  return {
    delay,
    setDelay,
    onChange,
  }
}

export default useYamlEditor

*/
