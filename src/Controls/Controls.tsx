import React from 'react'
import styled from 'styled-components'
import Actions from 'components/common/Actions'
import Select from 'components/common/Select'
import YamlEditor from 'components/YamlEditor'
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
  selectedPage?: string
  selectPage?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
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
      <YamlEditor value={yml} onChange={setYml} />
    </StyledRoot>
  )
}

export default Controls
