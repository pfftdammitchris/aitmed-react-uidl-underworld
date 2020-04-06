import React from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import ReactUIDL from '@aitmed/react-uidl'
import yaml from 'yaml'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useImmer } from 'use-immer'
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

const storedConfigKey = 'uidl-uw'

const initialState = {
  baseCss: null,
  basePage: null,
}

function useUIDL({ params = {}, navigate, location, match, uidlEndpoint }) {
  const [state, setState] = useImmer(initialState)

  const { yml, parsedYml, setYml } = useYamlEditor({
    initialValue: '',
  })

  const {
    selectedDevice,
    selectDevice,
    selectDeviceOptions,
  } = useSelectDevice({ initialValue: 'galaxyS5' })

  const { currentPage, selectPage } = useSelectPage({
    name: match?.params?.page || config.startPage,
    pages: config.pages,
    navigate,
  })

  React.useEffect(() => {
    async function init() {
      let c: any
      if (typeof window !== 'undefined') {
        c = window.localStorage.getItem(storedConfigKey)
        if (c) {
          c = JSON.parse(c)
        } else {
          c = await prynote.uidl.getUIDL(uidlEndpoint)
          window.localStorage.setItem(storedConfigKey, JSON.stringify(c))
        }
        const { baseUrl = '', startPage, page = [] } = c
        const baseCss = await prynote.uidl.getUIDL(`${baseUrl}BaseCSS.yml`)
        const basePage = await prynote.uidl.getUIDL(`${baseUrl}BasePage_en.yml`)
        setState((draft) => {
          draft.startPage = startPage
          draft.baseUrl = baseUrl
          draft.baseCss = baseCss
          draft.basePage = basePage
          draft.pages = page
        })
      }
    }
    init()
    // eslint-disable-next-line
  }, [])

  return {
    selectDevice,
    selectedDevice,
    selectDeviceOptions,
    selectPage,
    currentPage,
  }
}

export default useUIDL
