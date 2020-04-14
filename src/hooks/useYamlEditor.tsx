// Utility react hook for debugging UIDL - Provides controls for working
//    with text fields. Ex: WYSIWYG UIDL editor
import React from 'react'
import {
  EditorState,
  ContentState,
  DraftHandleValue,
  Modifier,
  RichUtils,
  getDefaultKeyBinding,
} from 'draft-js'
import exampleYml from 'data/1_SignIn'
import { log } from 'utils'

export interface UseYamlEditorOptions {
  onYmlChange: (yml: React.ChangeEvent<any> | string) => any
  getIndentation?: (text: string) => string
  insertNewLine?: (editorState: EditorState) => EditorState
  removeIndent?: (editorState: EditorState) => EditorState | undefined
  delay?: number
}

function useYamlEditor({
  onYmlChange,
  delay: delayProp = 50,
  getIndentation,
  insertNewLine,
  removeIndent,
}: UseYamlEditorOptions) {
  const [delay, setDelay] = React.useState(delayProp)
  const [exampleInitialized, setExampledInitialized] = React.useState(false)
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  )

  function initializeExample() {
    const contentState = ContentState.createFromText(exampleYml)
    const newEditorState = EditorState.createWithContent(contentState)
    onChange(newEditorState)
    if (!exampleInitialized) setExampledInitialized(true)
  }

  function onChange(nextEditorState: EditorState) {
    const contentState = nextEditorState.getCurrentContent()
    onYmlChange(contentState.getPlainText())
    setEditorState(nextEditorState)
  }

  /**
   * @param { string } command - Key command
   */
  function handleKeyCommand(command: string) {
    let newState

    if (removeIndent) {
      if (command === 'backspace') {
        newState = removeIndent(editorState)
      }
    } else {
      log({ msg: 'Please provide a removeIndent function', color: 'red' })
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

  function onPastedText(text: string): DraftHandleValue {
    if (exampleInitialized) return 'not-handled'
    const contentState = ContentState.createFromText(text)
    const nextEditorState = EditorState.createWithContent(contentState)
    onChange(nextEditorState)
    return 'handled'
  }

  function keyBindingFn(e: React.KeyboardEvent<any>) {
    const command = undefined
    // const command = getKeyBinding(e)
    return command || getDefaultKeyBinding(e)
  }

  /** Detects and persists indentation when enter is pressed
   * @param { object } e - Event object
   */
  function onReturn(e: React.KeyboardEvent<any>): DraftHandleValue {
    if (!insertNewLine) {
      log({ msg: 'Please provide an insertNewLine function', color: 'red' })
      return 'not-handled'
    }
    onChange(insertNewLine(editorState))
    return 'handled'
  }

  /** Adds two spaces
   * @param { object } e - Event object
   */
  function onTab(e: React.KeyboardEvent<any>): DraftHandleValue {
    e.preventDefault()

    if (!getIndentation) {
      log({
        msg: 'Please pass in a getIndentation function for tabs to be handled',
        color: 'red',
      })
      return 'not-handled'
    }

    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const startKey = selectionState.getStartKey()
    const currentBlock = contentState.getBlockForKey(startKey)

    const indentation = getIndentation(currentBlock.getText())

    let newContentState

    if (selectionState.isCollapsed()) {
      newContentState = Modifier.insertText(
        contentState,
        selectionState,
        indentation,
      )
    } else {
      newContentState = Modifier.replaceText(
        contentState,
        selectionState,
        indentation,
      )
    }

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters',
    )

    onChange(newEditorState)
    return 'handled'
  }

  return {
    editorState,
    onChange,
    keyBindingFn,
    handleKeyCommand,
    onReturn,
    onPastedText,
    onTab,
    delay,
    setDelay,
    exampleInitialized,
    initializeExample,
  }
}

export default useYamlEditor
