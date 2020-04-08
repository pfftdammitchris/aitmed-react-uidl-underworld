import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import styled from 'styled-components'
import ReactUIDL from '@aitmed/react-uidl'
import Grid from '@material-ui/core/Grid'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import YamlEditor from 'components/YamlEditor'
import AutoSave from 'components/AutoSave'
import Panel from 'components/Panel'
import YamlEditorToolbar from 'components/YamlEditorToolbar'
import Button from 'components/uidl/Button'
import Image from 'components/uidl/Image'
import Input from 'components/uidl/Input'
import Label from 'components/uidl/Label'
import Div from 'components/uidl/Div'
import UIDLSelect from 'components/uidl/Select'
import useUIDL from 'hooks/useUIDL'
import Controls from 'components/Controls'
import { devices, DeviceKey } from 'hooks/useSelectDevice'
import Documentation from 'components/Documentation'
import { log } from './utils/common'

const baseUrl = 'https://public.aitmed.com/alpha/'
const uidlEndpoint = `${baseUrl}uidlEndpoint.yml`

function UIDLDiv({ style, ...props }: any) {
  const styles = {
    ...style,
    ...(props.componentId === 'bodyContainer'
      ? { background: '#fff' }
      : undefined),
    ...(props.componentId === 'header' ? { background: '#fff' } : undefined),
  }
  return <Div style={styles} {...props} />
}

const StyledDocumentation = styled.div`
  padding-top: 12px;
  background: rgba(55, 61, 73, 0.975);
  box-sizing: border-box;
`

function App({
  history,
  location,
  match,
}: RouteChildrenProps<{ page?: string }>) {
  const [vw, setVw] = React.useState(devices['galaxyS5'].sizes.width)
  const [vh, setVh] = React.useState(devices['galaxyS5'].sizes.height)
  const theme = useTheme()
  const isWidescreen = useMediaQuery(theme.breakpoints.only('xl'))
  const {
    config,
    baseCss,
    basePage,
    selectDevice,
    selectedDevice,
    selectDeviceOptions,
    selectedPage,
    selectPage,
    selectPageOptions,
    yml,
    parsedYml,
    setYml,
  } = useUIDL({
    baseUrl,
    uidlEndpoint,
    location,
    params: match?.params,
    navigate: history.push,
  })

  React.useEffect(() => {
    const device = devices[selectedDevice as DeviceKey]
    setVw(device.sizes.width)
    setVh(device.sizes.height)
  }, [selectedDevice])

  if (config && baseCss && basePage && parsedYml) {
    if (process.env.NODE_ENV !== 'production') {
      log({ msg: 'config', color: 'olive', data: config })
      log({ msg: 'baseCss', color: 'olive', data: baseCss })
      log({ msg: 'basePage', color: 'olive', data: basePage })
      log({ msg: 'page', color: 'olive', data: parsedYml })
    }
  }

  return (
    <>
      <StyledDocumentation>
        <Grid spacing={10} justify="center" container>
          <Panel
            label="What's supported?"
            sublabel="Texts in purple represent keys"
            textColor="#fafafa"
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              overflow: 'hidden',
            }}
            xs={10}
            sm={10}
            md={6}
            lg={5}
            xl={5}
            item
          >
            <Documentation />
          </Panel>
        </Grid>
      </StyledDocumentation>
      <div style={{ height: 50 }} />
      <Grid
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
        justify="center"
        direction={
          selectedDevice === 'iPad' && !isWidescreen ? 'column' : 'row'
        }
        container
      >
        <Panel xs={12} sm={6} md={5} lg={5} xl={5} item>
          <Typography
            component="div"
            align="center"
            variant="caption"
            color="secondary"
          >
            {vw}px / {vh}px
          </Typography>
          <div
            style={{
              margin: 'auto',
              position: 'relative',
              width: vw,
              height: vh,
              border: '2px solid magenta',
            }}
          >
            <ReactUIDL
              baseCss={baseCss}
              basePage={basePage}
              page={parsedYml}
              config={config}
              components={{
                Button,
                Image,
                Input,
                Label,
                Div: UIDLDiv,
                Select: UIDLSelect,
              }}
              viewportWidth={vw}
              viewportHeight={vh}
            />
          </div>
        </Panel>
        <Panel xs={12} sm={6} md={7} lg={7} xl={5} item>
          <Controls
            device={{
              selected: selectedDevice,
              select: selectDevice,
              selectOptions: selectDeviceOptions,
            }}
            page={{
              selected: selectedPage,
              select: selectPage,
              selectOptions: selectPageOptions,
            }}
          />
          {/* <YamlEditorToolbar /> */}
          <YamlEditor value={yml} onChange={setYml} />
        </Panel>
      </Grid>
    </>
  )
}

export default App
