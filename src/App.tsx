import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import ReactUIDL from '@aitmed/react-uidl'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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
import { devices, DeviceKey } from 'hooks/useSelectDevice'
import Controls from './Controls'
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
    pages,
    selectDevice,
    selectedDevice,
    selectDeviceOptions,
    selectedPage,
    selectPage,
    selectPageOptions,
    initialPageYml,
    yml,
    parsedYml,
    setYml,
    onSelectDevice,
    onSelectPage,
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
    <Grid
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
      justify="center"
      direction={selectedDevice === 'iPad' && !isWidescreen ? 'column' : 'row'}
      container
    >
      <Panel
        label="Functions"
        sublabel="Detected Functions"
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={5}
        item
      />
      <Panel
        label="Assets"
        sublabel="Detected Assets"
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={5}
        item
      >
        <Paper
          style={{
            padding: 25,
            minHeight: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}
          elevation={0}
        />
      </Panel>
      <Panel label="Component Board" xs={12} sm={6} md={6} lg={4} xl={5} item>
        <Paper
          style={{
            padding: 25,
            minHeight: 100,
          }}
          elevation={0}
        />
      </Panel>
      <Panel
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          overflow: 'hidden',
        }}
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={5}
        item
      >
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
      </Panel>
      <Panel xs={12} sm={6} md={6} lg={6} xl={5} item>
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
      <Panel
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={5}
        item
      >
        <YamlEditorToolbar />
        <YamlEditor value={yml} onChange={setYml} />
      </Panel>
      <Panel
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={5}
        item
      />
      <Panel
        label="History"
        sublabel="(Saves every 15 seconds. Maximum 8 items in stack)"
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={5}
        item
      >
        <AutoSave
          // @ts-ignore
          storedKey={parsedYml ? parsedYml.pageName || '' : ''}
          storedObj={{ data: yml }}
          render={({ cache, id }) => {
            console.log('autosave cache: ', cache)
            console.log('autosave id: ', id)
            return null
          }}
        />
      </Panel>
    </Grid>
  )
}

export default App
