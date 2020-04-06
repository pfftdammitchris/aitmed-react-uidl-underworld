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
  .label {
    color: rgba(255, 255, 255, 0.7);
  }
  .input {
    color: #fff;
  }
  .notchedOutline {
    border-color: #fff;
  }
`

function YamlEditor(props: {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
}) {
  return (
    <StyledYamlEditorRoot>
      <TextField
        name="page"
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
        autoFocus
        multiline
        fullWidth
        {...props}
      />
    </StyledYamlEditorRoot>
  )
}

export default YamlEditor
