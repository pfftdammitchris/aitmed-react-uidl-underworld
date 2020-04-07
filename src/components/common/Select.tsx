import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { SelectProps as MuiSelectProps } from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export interface SelectOption {
  key?: string
  value: string
  label: string
}

export interface SelectProps extends MuiSelectProps {
  options: SelectOption[]
}

const StyledSelect = styled(TextField)`
  option,
  select {
    color: #333;
  }
  .input {
    color: #333;
    box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
  }
  .outline {
    color: #333;
    border: 1px #37506c solid;
  }
  .label {
    color: rgba(0, 0, 0, 0.7);
  }
`

function Select({
  options,
  InputProps,
  InputLabelProps,
  SelectProps,
  ...rest
}: SelectProps) {
  return (
    <StyledSelect
      margin="dense"
      InputProps={{
        ...InputProps,
        classes: {
          root: 'input',
          notchedOutline: 'outline',
        },
      }}
      InputLabelProps={{
        ...InputLabelProps,
        classes: { root: 'label', ...InputLabelProps?.classes },
        shrink: true,
      }}
      SelectProps={{
        ...SelectProps,
        classes: {
          outlined: 'outlined',
          ...SelectProps?.classes,
        },
      }}
      variant="outlined"
      color="secondary"
      select
      fullWidth
      {...rest}
    >
      {options.map(({ value, key = value, label }) => (
        <MenuItem key={key} value={value}>
          {label}
        </MenuItem>
      ))}
    </StyledSelect>
  )
}

export default Select
