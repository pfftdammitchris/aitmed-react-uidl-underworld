import React from 'react'
import yaml from 'yaml'
import axios from 'axios'
import { useImmer } from 'use-immer'
import { devices } from 'hooks/useSelectDevice'
import useComponentsAsProps, { resolveStyles } from 'hooks/useComponentsAsProps'
import yml from 'data/testDataSignIn'

const baseUrl = 'https://public.aitmed.com/alpha/'
const parsedYml = yaml.parse(yml)

function TestChild({ css }: any) {
  const { components } = useComponentsAsProps({
    baseUrl: baseUrl,
    components: parsedYml.components,
    css,
    viewport: {
      viewportWidth: devices.iPhone6_7_8.sizes.width,
      viewportHeight: devices.iPhone6_7_8.sizes.height,
    },
  })

  React.useEffect(() => {
    console.log(components[0])
  }, [components])

  function renderChildren({ type, children, ...props }) {
    return React.createElement(type, props, children?.map(renderChildren))
  }

  return components?.map(renderChildren)
}

function Test() {
  const [state, setState] = useImmer({ css: null })

  React.useEffect(() => {
    axios
      .get(baseUrl + 'BaseCSS.yml')
      .then(({ data }) => {
        setState((draft) => {
          draft.css = yaml.parse(data)
        })
      })
      .catch(console.error)
    // eslint-disable-next-line
  }, [])

  if (!state.css) return null

  return <TestChild css={state.css} />
}

export default Test
