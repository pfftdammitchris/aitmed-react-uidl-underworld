import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import ReactUIDL from '@aitmed/react-uidl'
import yaml from 'yaml'
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
const storedConfigKey = 'uidl-uw'

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
  const [vw, setVw] = React.useState(devices['galaxyS5'].sizes.width)
  const [vh, setVh] = React.useState(devices['galaxyS5'].sizes.height)
  const { selectDevice, selectPage } = useUIDL2({
    params: match?.params,
    location,
    navigate: history.push,
    uidlEndpoint,
  })

  function onSelectDevice(e) {
    selectDevice(e)
  }

  function onSelectPage(e) {
    selectPage(e)
  }

  React.useEffect(() => {
    init()
      .then((c) => {
        console.log('c:', c)
        setConfig(c)
      })
      .catch(console.error)
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    const device = devices[selectedDevice]
    setVw(device.sizes.width)
    setVh(device.sizes.height)
  }, [])

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
              baseCss={config.baseCss}
              basePage={config.basePage}
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
            parsedYml={parsedYml}
            current={current}
            selectPage={onSelectPage}
            selectDevice={onSelectDevice}
            selectedDevice={selectedDevice}
            pages={config.pages}
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

async function getUidlFromServer() {
  const config = await prynote.uidl.getUIDL(uidlEndpoint)
  const { baseUrl, startPage, page: pages = [], ...rest } = config
  return {
    baseUrl,
    startPage,
    pages,
    ...rest,
  }
}

async function init() {
  let c: { baseUrl: string; baseCss: any; basePage: any; startPage: any } | any

  if (typeof window !== 'undefined') {
    c = window.localStorage.getItem(storedConfigKey)
    if (c) {
      c = JSON.parse(c)
    } else {
      c = await getUidlFromServer()
      window.localStorage.setItem(storedConfigKey, JSON.stringify(c))
    }
    const { baseUrl = '', startPage, pages = [] } = c
    const baseCss = await prynote.uidl.getUIDL(`${baseUrl}BaseCSS.yml`)
    const basePage = await prynote.uidl.getUIDL(`${baseUrl}BasePage_en.yml`)
    return {
      startPage,
      baseUrl,
      baseCss,
      basePage,
      pages,
    }
  }
}

export default App
