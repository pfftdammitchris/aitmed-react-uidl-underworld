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
  colorScheme?: 'light' | 'dark'
}

const StyledSelect = styled(TextField)<{ colorScheme?: 'light' | 'dark' }>`
  .select {
    color: ${({ colorScheme }) => {
      if (colorScheme === 'light') {
        return 'rgba(0, 0, 0, 0.8)'
      }
      return '#fff'
    }};
  }
  .input {
    box-shadow: ${({ colorScheme }) => {
      if (colorScheme === 'light') {
        return '1px 1px 10px rgba(25, 37, 45, 0.15)'
      }
      return '1px 1px 10px rgba(255, 255, 255, 0.15)'
    }};
  }
  .outline {
    border: ${({ colorScheme }) => {
      if (colorScheme === 'light') {
        return '1px #37506c solid'
      }
      return '1px #fff solid'
    }};
    color: ${({ colorScheme }) => {
      if (colorScheme === 'light') {
        return 'rgba(0, 0, 0, 0.8)'
      }
      return '#fff'
    }};
  }
  .label {
    color: ${({ colorScheme }) => {
      if (colorScheme === 'light') {
        return 'rgba(0, 0, 0, 0.7)'
      }
      return '#fff'
    }};
  }
  .arrow {
    color: #fff;
  }
`

function Select({
  options,
  InputProps,
  InputLabelProps,
  SelectProps,
  colorScheme = 'light',
  ...rest
}: any) {
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
          select: 'select',
          outlined: 'outlined',
          icon: 'arrow',
          ...SelectProps?.classes,
        },
      }}
      variant="outlined"
      color="secondary"
      colorScheme={colorScheme}
      select
      {...rest}
    >
      {options.map(({ value, key = value, label }: any) => (
        <MenuItem key={key} value={value}>
          {label}
        </MenuItem>
      ))}
    </StyledSelect>
  )
}

export default Select
