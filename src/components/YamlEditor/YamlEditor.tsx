import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledYamlEditorRoot = styled.div`
  outline: none;
  textarea {
    outline: none;
    color: #fff;
    font-size: 12px;
    border-color: #fff;
  }
`

function YamlEditor(props: any) {
  return (
    <StyledYamlEditorRoot>
      <TextField
        name="page"
        rows={15}
        rowsMax={30}
        variant="outlined"
        color="default"
        spellCheck={false}
        autoFocus
        multiline
        fullWidth
        {...props}
      />
    </StyledYamlEditorRoot>
  )
}

export default YamlEditor
