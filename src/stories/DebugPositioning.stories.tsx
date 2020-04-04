import React from 'react'
import yaml from 'yaml'
import axios from 'axios'
import ReactUIDL from '@aitmed/react-uidl'
import styled from 'styled-components'
import { prynote } from 'app/client'
import Modal from 'components/uidl/Modal'
import Button from 'components/uidl/Button'
import Image from 'components/uidl/Image'
import Input from 'components/uidl/Input'
import Label from 'components/uidl/Label'
import Div from 'components/uidl/Div'
import Select from 'components/uidl/Select'
import Split from 'components/Split'
import Controls, { sizes } from 'Controls'
import useYamlTextField from 'hooks/useYamlTextField'
import useSelectPage from 'hooks/useSelectPage'
import testData from 'data/testData'
import testDataSignIn from 'data/testDataSignIn'
import testDataLanguages from 'data/testDataLanguages'
import testDataLanguagesFixed from 'data/testDataLanguagesFixed'
import AppContext from 'AppContext'

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

export default {
  title: 'Lightning Dev Tools',
  component: ReactUIDL,
  decorators: [
    (s: any) => (
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          position: 'absolute',
          padding: 25,
          width: '100vw',
          height: '100vh',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        {s()}
      </div>
    ),
  ],
}

export const Positioning = () => {
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
  const {
    options: pageSelectOptions,
    selected: selectedPage,
    selectPage,
  } = useSelectPage({
    pages: config?.page,
    startPage: config?.startPage,
  })

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
          pageSelectOptions={pageSelectOptions}
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
