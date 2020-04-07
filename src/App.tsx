import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import ReactUIDL from '@aitmed/react-uidl'
import Grid from '@material-ui/core/Grid'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import YamlEditor from 'components/YamlEditor'
import AutoSave from 'components/AutoSave'
import Board from 'components/Board'
import Actions from 'components/common/Actions'
import Select from 'components/common/Select'
import Button from 'components/uidl/Button'
import Image from 'components/uidl/Image'
import Input from 'components/uidl/Input'
import Label from 'components/uidl/Label'
import Div from 'components/uidl/Div'
import UIDLSelect from 'components/uidl/Select'
import useUIDL from 'hooks/useUIDL'
import { devices, DeviceKey } from 'hooks/useSelectDevice'
import { toSelectPageOptions } from 'hooks/useSelectPage'
import { log } from './utils/common'
import Controls from './Controls'

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
      <Grid xs={12} sm={6} md={6} lg={4} xl={5} item>
        <Board
          component={Grid}
          label="Component Board"
          sublabel="Draggable components"
          height="60%"
        />
      </Grid>
      <Grid
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
          onChange={onSelectPage}
          options={toSelectPageOptions(pages)}
        />
        <Board label="Functions" sublabel="Detected Functions" />
        <Board label="Assets" sublabel="Detected Assets" />
      </Grid>
      <Grid
        style={{ overflow: 'hidden' }}
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={5}
        item
      >
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
      </Grid>
      <Grid
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
        <YamlEditor value={yml} onChange={setYml} />
        <Board
          label="History"
          sublabel="(Saves every 15 seconds. Maximum 8 items in stack)"
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
        </Board>
      </Grid>
    </Grid>
  )
}

export default App
