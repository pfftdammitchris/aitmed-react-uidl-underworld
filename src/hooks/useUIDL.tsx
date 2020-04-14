import React from 'react'
import yaml from 'yaml'
import { useImmer } from 'use-immer'
import { prynote } from 'app/client'
import useSelectPage from 'hooks/useSelectPage'
import useSelectDevice from 'hooks/useSelectDevice'

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
  const [yml, setYml] = React.useState('')
  const [parsedYml, setParsedYml] = React.useState({})

  const {
    selectedDevice,
    selectDevice,
    selectDeviceOptions,
  } = useSelectDevice({ initialValue: 'galaxyS5' })

  const { selectedPage, selectPage, selectPageOptions } = useSelectPage({
    name: '',
    pages: state.pages,
    navigate,
  })

  function onSelectDevice(e: any) {
    selectDevice(e)
  }

  function onSelectPage(e: any) {
    selectPage(e)
  }

  function onYmlChange(e: React.ChangeEvent<HTMLInputElement> | string) {
    // Caller is directly using a YAML string
    let parsed
    if (typeof e === 'string') {
      try {
        parsed = yaml.parse(e)
      } catch (error) {
        console.error(error)
      }
      setYml(e)
      if (parsed) setParsedYml(parsed)
    } else {
      e.persist()
      if (e.target.value !== yml) {
        try {
          parsed = yaml.parse(e.target.value)
        } catch (error) {
          console.error(error)
        }
        setYml(e.target.value)
        if (parsed) setParsedYml(parsed)
      }
    }
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
    onYmlChange,
    onSelectDevice,
    onSelectPage,
  }
}

export default useUIDL
