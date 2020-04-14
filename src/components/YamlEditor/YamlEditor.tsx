import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledYamlEditorRoot = styled.div`
  textarea {
    color: rgba(0, 0, 0, 0.8);
    font-size: 13px;
  }
  .input {
    box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
    padding-top: 16px;
  }
  .label {
    color: rgba(0, 0, 0, 0.7);
  }
  .notchedOutline {
    /* border-color: #37506c; */
    border: 1px #37506c solid;
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
        {...props}
      />
    </StyledYamlEditorRoot>
  )
}

export default YamlEditor
