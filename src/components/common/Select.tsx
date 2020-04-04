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
    color: #fff;
  }
  .outline {
    color: #fff;
  }
  .underline {
    color: #fff;
    border-color: #fff;
  }
  .label {
    color: rgba(255, 255, 255, 0.7);
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
      margin="normal"
      InputProps={{
        ...InputProps,
        classes: { underline: 'underline', ...InputProps?.classes },
      }}
      InputLabelProps={{
        ...InputLabelProps,
        classes: { root: 'label', ...InputLabelProps?.classes },
      }}
      SelectProps={{
        ...SelectProps,
        classes: { outlined: 'outline', ...SelectProps?.classes },
      }}
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
