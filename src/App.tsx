import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import ReactUIDL from '@aitmed/react-uidl'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { prynote } from 'app/client'
import Modal from 'components/uidl/Modal'
import Button from 'components/uidl/Button'
import Image from 'components/uidl/Image'
import Input from 'components/uidl/Input'
import Label from 'components/uidl/Label'
import Div from 'components/uidl/Div'
import Select from 'components/uidl/Select'
import Split from 'components/Split'
import useUIDL from 'hooks/useUIDL'
import useYamlEditor from 'hooks/useYamlEditor'
import useSelectPage from 'hooks/useSelectPage'
import useSelectDevice, { devices } from 'hooks/useSelectDevice'
import useViewport from 'hooks/useViewport'
import testData from 'data/testDataSignIn'
import Controls from './Controls'
import AppContext from './AppContext'

const uidlEndpoint = 'https://public.aitmed.com/alpha/uidlEndpoint.yml'

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
  const ctx = React.useContext(AppContext)
  const [{ config, baseCss, basePage }, setInitData] = React.useState<any>({})
  const [vw, setVw] = React.useState(devices['galaxyS5'].sizes.width)
  const [vh, setVh] = React.useState(devices['galaxyS5'].sizes.height)
  const { yml, parsedYml, setParsedYml, setYml } = useYamlEditor({
    initialValue: testData.trim(),
  })
  const { selectedPage, selectPage } = useSelectPage({
    pages: config?.page,
    startPage: config?.startPage,
  })
  const {
    selectedDevice,
    selectDevice,
    selectDeviceOptions,
  } = useSelectDevice({ initialValue: 'galaxyS5' })

  React.useEffect(() => {
    initBases().then(setInitData).catch(console.error)
  }, [])

  console.log(parsedYml)

  function onSelectDevice(e) {
    selectDevice(e)
  }

  async function onSelectPage(e) {
    try {
      selectPage(e)
      const nextYml = await axios.get(
        `${config?.baseUrl}${e.target.value}_en.yml`,
      )
      setYml(nextYml.data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    const device = devices[selectedDevice]
    setVw(device.sizes.width)
    setVh(device.sizes.height)
  }, [selectedDevice])

  return (
    <>
      <Grid
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
        justify="center"
        direction={selectedDevice === 'iPad' ? 'column' : 'row'}
        container
      >
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
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
                Select,
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
          xl={6}
          item
        >
          <Controls
            viewport={{
              width: vw,
              height: vh,
            }}
            yml={yml}
            setYml={setYml}
            selectedPage={selectedPage}
            selectPage={onSelectPage}
            selectDevice={onSelectDevice}
            selectedDevice={selectedDevice}
            pages={config?.page}
          />
        </Grid>
      </Grid>
      {ctx?.modal.opened && (
        <Modal
          name={ctx.modal.name}
          isOpen={ctx.modal.opened}
          title={ctx.modal.title}
          subtitle={ctx.modal.subtitle}
          close={ctx.closeModal}
        />
      )}
    </>
  )
}

async function initBases() {
  try {
    const config = await prynote.uidl.getUIDL(uidlEndpoint)
    const baseUrl = config.baseUrl
    const reqUris = [`${baseUrl}BaseCSS.yml`, `${baseUrl}BasePage_en.yml`]
    const reqs = reqUris.map((uri: string) => prynote.uidl.getUIDL(uri))
    const [baseCss, basePage] = await Promise.all(reqs)
    return {
      config,
      baseCss,
      basePage,
    }
  } catch (error) {
    console.error(error)
  }
}

export default App
