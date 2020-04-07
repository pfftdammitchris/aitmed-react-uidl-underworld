import React from 'react'
import styled from 'styled-components'
import Actions from 'components/common/Actions'
import Select from 'components/common/Select'
import { toSelectPageOptions } from 'hooks/useSelectPage'
import { selectDeviceOptions } from 'hooks/useSelectDevice'

export interface ControlsProps {
  baseUrl?: string
  viewport?: {
    width: number
    height: number
  }
  yml?: string
  setYml?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectedDevice?: string
  selectDevice?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectPage?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectedPage?: string
  page?: any
  pages?: string[]
}

const StyledRoot = styled.div`
  width: 100%;
`

function Controls({
  viewport,
  yml,
  setYml,
  selectedDevice,
  selectDevice,
  selectedPage = '',
  selectPage,
  page,
  pages = [],
}: ControlsProps) {
  return (
    <StyledRoot>
      <Actions>
        <Select
          name="device"
          label="Select Device"
          value={selectedDevice}
          onChange={selectDevice}
          options={selectDeviceOptions}
        />
      </Actions>
      <Select
        name="page"
        label="Select Page"
        value={selectedPage}
        onChange={selectPage}
        options={toSelectPageOptions(pages)}
      />
    </StyledRoot>
  )
}

export default Controls
