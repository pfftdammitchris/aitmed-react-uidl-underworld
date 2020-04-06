import React from 'react'
import styled from 'styled-components'
import Actions from 'components/common/Actions'
import Select from 'components/common/Select'
import Statistics from 'components/Statistics'
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
  parsedYml?: any
  setYml?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectedDevice?: string
  selectDevice?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  selectPage?: (e: React.ChangeEvent<any>) => void | ((e: string) => void)
  current?: string
  pages?: string[]
}

const StyledRoot = styled.div`
  width: 100%;
`

function Controls({
  viewport,
  yml,
  setYml,
  parsedYml,
  selectedDevice,
  selectDevice,
  current = '',
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
        value={current}
        onChange={selectPage}
        options={toSelectPageOptions(pages)}
      />
      <Statistics parsedYml={parsedYml} />
      <YamlEditor value={yml} onChange={setYml} />
    </StyledRoot>
  )
}

export default Controls
