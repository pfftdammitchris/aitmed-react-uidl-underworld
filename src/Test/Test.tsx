import React, { Children } from 'react'
import styled from 'styled-components'
import yaml from 'yaml'
import get from 'lodash.get'
import omit from 'lodash.omit'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { prynote } from 'app/client'
import useUIDL2 from 'hooks/useUIDL2'
import { Typography } from '@material-ui/core'

const baseUrl = 'https://public.aitmed.com/alpha/'
const uidlEndpoint = `${baseUrl}uidlEndpoint.yml`

export interface TestProps {
  //
}

const ymlUrl =
  'https://s3.us-east-2.amazonaws.com/public.aitmed.com/alpha/admin/22_ProfileEdit01_en.yml'

function ComponentObject({ data, componentPath, setState }) {
  const [value, setValue] = React.useState('')
  console.log(data)
  return (
    <div>
      <TextField
        name={data.componentId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={data.componentId}
        fullWidth
      />
    </div>
  )
}

function Test(props: TestProps) {
  const [parsedYml, setParsedYml] = React.useState({})
  const uidl = useUIDL2({ parsedYml })

  React.useEffect(() => {
    async function init() {
      const { data } = await axios.get(ymlUrl)
      const page = yaml.parse(data)
      setParsedYml(page)
    }
    init()
    // eslint-disable-next-line
  }, [])

  console.log(uidl)

  return (
    <Grid justify="center" container>
      <Grid xs={7} item>
        <Typography variant="h6" paragraph>
          Components
        </Typography>
        {Object.keys(uidl.componentPaths).map((componentId: string) => {
          const componentPath = uidl.componentPaths[componentId]
          const data = get(parsedYml, componentPath, null)
          return (
            <ComponentObject
              componentPath={componentPath}
              data={data}
              setState={setParsedYml}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Test
