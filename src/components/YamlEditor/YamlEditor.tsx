import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { Editor } from 'draft-js'
import useYamlEditor from 'hooks/useYamlEditor'
import blockRenderMap from './blockRenderMap'
import blockRendererFn from './blockRendererFn'
import { getIndentation, insertNewLine, removeIndent } from './utils'

export interface YamlEditorProps {
  onYmlChange: (yml: any) => any
}

const StyledRoot = styled.div`
  margin: 12px 0;
`

const StyledEditor = styled.pre`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
  padding: 12px;
`

function YamlEditor({ onYmlChange }: YamlEditorProps) {
  const {
    editorState,
    onChange,
    keyBindingFn,
    handleKeyCommand,
    onReturn,
    onPastedText,
    onTab,
    exampleInitialized,
    initializeExample,
  } = useYamlEditor({
    onYmlChange,
    getIndentation,
    insertNewLine,
    removeIndent,
  })

  return (
    <StyledRoot>
      <Typography gutterBottom>
        Paste or write YAML and elements will automatically appear.{' '}
        <Button
          size="small"
          type="button"
          variant="outlined"
          onClick={initializeExample}
          disabled={exampleInitialized}
        >
          Initialize an example
        </Button>
      </Typography>
      <StyledEditor>
        <Editor
          editorState={editorState}
          onChange={onChange}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          handleReturn={onReturn}
          onTab={onTab}
          handlePastedText={onPastedText}
          blockRenderMap={blockRenderMap}
          blockRendererFn={blockRendererFn}
        />
      </StyledEditor>
    </StyledRoot>
  )
}

export default React.memo(YamlEditor, () => false)
