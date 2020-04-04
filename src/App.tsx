import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import ReactUIDL from '@aitmed/react-uidl'
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
import useYamlTextField from 'hooks/useYamlTextField'
import useSelectPage from 'hooks/useSelectPage'
import useSelectDevice from 'hooks/useSelectDevice'
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
  const [vw, setVw] = React.useState(sizes.GalaxyS5.width)
  const [vh, setVh] = React.useState(sizes.GalaxyS5.height)
  const {
    value: yml,
    onChange: onYmlChange,
    parsed: parsedYml,
  } = useYamlTextField({
    initialValue: testDataSignIn.trim(),
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

  if (!config) return null

  function setViewportWidth(value: any) {
    if (value !== vw) setVw(value)
  }

  function setViewportHeight(value: any) {
    if (value !== vh) setVh(value)
  }

  return (
    <Split>
      <div
        style={{
          width: vw,
          height: vh,
          position: 'absolute',
          border: '2px solid magenta',
        }}
      >
        <ReactUIDL
          baseCss={baseCss}
          basePage={basePage}
          currentPage={parsedYml}
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
        {ctx?.modal.opened && (
          <Modal
            name={ctx.modal.name}
            isOpen={ctx.modal.opened}
            title={ctx.modal.title}
            subtitle={ctx.modal.subtitle}
            close={ctx.closeModal}
          />
        )}
      </div>
      <div style={{ width: '100%' }}>
        <Controls
          viewportWidth={vw}
          viewportHeight={vh}
          setViewportWidth={setViewportWidth}
          setViewportHeight={setViewportHeight}
          yml={yml}
          onYmlChange={onYmlChange}
          selectedPage={selectedPage}
          selectPage={selectPage}
          pages={config?.page}
        />
      </div>
    </Split>
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
