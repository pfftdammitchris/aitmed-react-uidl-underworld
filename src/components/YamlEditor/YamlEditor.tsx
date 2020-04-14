import React from 'react'
import styled from 'styled-components'
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js'
import CodeUtils from 'draft-js-code'
import useYamlEditor from 'hooks/useYamlEditor'

export interface YamlEditorProps {
  yml: string
  setYml: (yml: string) => void
}

const StyledRoot = styled.div`
  margin: 12px 0;
`

const StyledEditor = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
  padding: 12px;
`

function YamlEditor({ yml, setYml }: YamlEditorProps) {
  const {
    editorState,
    onChange,
    keyBindingFn,
    handleKeyCommand,
    handleReturn,
    onTab,
  } = useYamlEditor({ yml, setYml })

  return (
    <StyledRoot>
      <StyledEditor>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="Enter YAML"
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          handleReturn={handleReturn}
          onTab={onTab}
        />
      </StyledEditor>
    </StyledRoot>
  )
}

export default YamlEditor

/*
<StyledRoot>
      <TextField
        name="page"
        value={yml}
        onChange={setYml}
        rows={15}
        rowsMax={30}
        label="Editor"
        InputLabelProps={{
          classes: {
            root: 'label',
          },
        }}
        variant="outlined"
        color="secondary"
        spellCheck={false}
        InputProps={{
          classes: {
            root: 'input',
            notchedOutline: 'notchedOutline',
          },
        }}
        margin="normal"
        multiline
        fullWidth
        {...rest}
      />
    </StyledRoot>
*/
