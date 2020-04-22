import React from 'react'
import yaml from 'yaml'
import usePageStatistics from 'hooks/usePageStatistics'
import useComponentsAsProps from 'hooks/useComponentsAsProps'
import yml from 'data/testDataSignIn'

const parsedYml = yaml.parse(yml)

function Test() {
  const { components } = useComponentsAsProps({
    components: parsedYml.components,
  })

  React.useEffect(() => {
    console.log(components)
  }, [components])

  return null
}

export default Test
