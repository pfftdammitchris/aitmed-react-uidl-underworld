import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js'
import CodeUtils from 'draft-js-code'

const StyledRoot = styled.div`
  margin: 10px 0;
`

const StyledLabel = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
`

const StyledEditor = styled.div`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.7);
`

export interface YamlEditorProps {
  yml: string
  setYml: (yml: string) => any
}

function YamlEditor({ yml, setYml, ...rest }: YamlEditorProps) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  )

  function onChange(newEditorState: EditorState) {
    setEditorState(newEditorState)
  }

  function onKeyCommand(command: string) {
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

  function keyBindingFn(e) {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return getDefaultKeyBinding(e)
    }
    const command = CodeUtils.getKeyBinding(e)
    return command || getDefaultKeyBinding(e)
  }

  function onReturn(e) {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return 'not-handled'
    }
    onChange(CodeUtils.handleReturn(e, editorState))
    return 'handled'
  }

  function onTab(e) {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return 'not-handled'
    }
    onChange(CodeUtils.onTab(e, editorState))
    return 'handled'
  }

  return (
    <StyledRoot>
      <StyledLabel variant="button">Editor</StyledLabel>
      <StyledEditor>
        <Editor
          editorState={editorState}
          onChange={onChange}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={onKeyCommand}
          handleReturn={onReturn}
          onTab={onTab}
          {...rest}
        />
      </StyledEditor>
    </StyledRoot>
  )
}

export default YamlEditor
