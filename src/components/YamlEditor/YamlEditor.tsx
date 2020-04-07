import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledYamlEditorRoot = styled.div`
  textarea {
    color: #333;
    font-size: 13px;
  }
  .input {
    color: #333;
    box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
  }
  .label {
    color: rgba(0, 0, 0, 0.7);
  }
  .notchedOutline {
    border-color: #37506c;
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
