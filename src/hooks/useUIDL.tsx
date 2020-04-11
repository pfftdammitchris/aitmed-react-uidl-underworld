import React from 'react'
import axios from 'axios'
import { useImmer } from 'use-immer'
import { prynote } from 'app/client'
import useYamlEditor from 'hooks/useYamlEditor'
import useSelectPage from 'hooks/useSelectPage'
import useSelectDevice from 'hooks/useSelectDevice'
import { log } from 'utils'

const storedConfigKey = 'uidl-uw'

export interface UseUIDLState {
  config: null | {
    baseUrl: string
    languageSuffix: { [key: string]: string }
    fileSuffix: string
    startPage: string
    page: string[]
  }
  baseCss: null | {
    pageName?: any
    defaultValue?: any
    globalVar?: any
    classNames?: any
  }
  basePage: null | any
  pages: string[]
  initialPageYml: string
}

const initialState: UseUIDLState = {
  config: null,
  baseCss: null,
  basePage: null,
  pages: [],
  initialPageYml: '',
}

function useUIDL({
  baseUrl,
  location,
  params = {},
  navigate,
  uidlEndpoint,
}: {
  baseUrl?: string
  location: any
  params: { page?: string } | undefined
  navigate: (path: string) => any
  uidlEndpoint: string
}) {
  const [state, setState] = useImmer(initialState)

  const {
    selectedDevice,
    selectDevice,
    selectDeviceOptions,
  } = useSelectDevice({ initialValue: 'galaxyS5' })

  const { selectedPage, selectPage, selectPageOptions } = useSelectPage({
    name: '1_SignIn',
    pages: state.pages,
    navigate,
  })

  const { yml, parsedYml, setYml, setYmlByParsed } = useYamlEditor({
    initialValue: '',
    pageName: selectedPage,
  })

  function onSelectDevice(e: any) {
    selectDevice(e)
  }

  function onSelectPage(e: any) {
    selectPage(e)
  }

  React.useEffect(() => {
    async function init() {
      let config: any
      if (typeof window !== 'undefined') {
        config = window.localStorage.getItem(storedConfigKey)
        if (config) {
          config = JSON.parse(config)
        } else {
          config = await prynote.uidl.getUIDL(uidlEndpoint)
          window.localStorage.setItem(storedConfigKey, JSON.stringify(config))
        }
        const { baseUrl = '', page: pages = [] } = config
        const baseCss = await prynote.uidl.getUIDL(`${baseUrl}BaseCSS.yml`)
        const basePage = await prynote.uidl.getUIDL(`${baseUrl}BasePage_en.yml`)
        // if (location?.pathname === '/') {
        //   navigate(config.startPage || '1_SignIn')
        // }

        setState((draft) => {
          draft.config = config
          draft.baseCss = baseCss
          draft.basePage = basePage
          draft.pages = pages
        })
      }
    }
    init()
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    async function getUIDL() {
      try {
        const url = `${state.config?.baseUrl || baseUrl}${selectedPage}_en.yml`
        const { data: pageYml } = await axios.get(url)
        setYml(pageYml)
      } catch (error) {
        console.error(error)
        window.alert(error.message)
      }
    }
    log({ msg: `Fetching uidl page "${selectedPage}"`, color: '#a80a7a' })
    getUIDL()
    // eslint-disable-next-line
  }, [selectedPage])

  return {
    ...state,
    selectDevice,
    selectedDevice,
    selectDeviceOptions,
    selectPage,
    selectedPage,
    selectPageOptions,
    yml,
    parsedYml,
    setYml,
    setYmlByParsed,
    onSelectDevice,
    onSelectPage,
  }
}

export default useUIDL
