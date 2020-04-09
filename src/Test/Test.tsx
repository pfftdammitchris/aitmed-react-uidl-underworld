import React from 'react'
import styled from 'styled-components'
import yaml from 'yaml'
import axios from 'axios'
import { prynote } from 'app/client'
import useUIDL2 from 'hooks/useUIDL2'

const baseUrl = 'https://public.aitmed.com/alpha/'
const uidlEndpoint = `${baseUrl}uidlEndpoint.yml`

export interface TestProps {
  //
}

const ymlUrl =
  'https://s3.us-east-2.amazonaws.com/public.aitmed.com/alpha/admin/22_ProfileEdit01_en.yml'

function Test(props: TestProps) {
  const [state, setState] = React.useState({})
  const uidl = useUIDL2(state)

  React.useEffect(() => {
    async function init() {
      const config = await prynote.uidl.getUIDL(uidlEndpoint)
      const { baseUrl = '', page: pages = [] } = config
      const baseCss = await prynote.uidl.getUIDL(`${baseUrl}BaseCSS.yml`)
      const basePage = await prynote.uidl.getUIDL(`${baseUrl}BasePage_en.yml`)
      const { data: page } = await axios.get(ymlUrl)
      console.log(yaml.parseAllDocuments(page))
      setState({ baseCss, basePage, page })
    }
    init()
    // eslint-disable-next-line
  }, [])

  return <div>{null}</div>
}

export default Test
