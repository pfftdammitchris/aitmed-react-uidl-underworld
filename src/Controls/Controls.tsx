import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
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

const StyledBox = styled(Box)`
  border: 1px solid #37506c;
  border-radius: 4px;
  margin: 8px 0 10px;
  padding: 12px;
  color: #37506c;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.35;
  box-shadow: 1px 1px 10px rgba(25, 37, 45, 0.15);
  user-select: none;
`

const Panel = ({ label, sublabel, children, ...rest }: any) => {
  return (
    <StyledBox margin="normal" {...rest}>
      <Typography variant="button">{label}</Typography>
      {sublabel && (
        <Typography
          variant="caption"
          style={{ display: 'block', padding: 0, margin: 0 }}
          align="center"
        >
          {sublabel}
        </Typography>
      )}
      {children}
    </StyledBox>
  )
}

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
      <Panel
        label="Component Board"
        sublabel="Drag components to the preview to apply them"
      />
      <Panel label="Functions" />
      <Panel label="Assets" />
      <Select
        name="page"
        label="Select Page"
        value={selectedPage}
        onChange={selectPage}
        options={toSelectPageOptions(pages)}
      />
      <YamlEditor value={yml} onChange={setYml} />
      <Panel label="Unsupported component types" />
    </StyledRoot>
  )
}

export default Controls
