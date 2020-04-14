import React from 'react'
import Typography from '@material-ui/core/Typography'
import ComponentBoardContext from './ComponentBoardContext'

export interface YamlFlowMapProps {
  node: any
}

function YamlFlowMap({ node }: YamlFlowMapProps) {
  const { renderComponent } = React.useContext(ComponentBoardContext)
  console.log('Flow map node:', node)

  return (
    <div>
      <Typography>FLOW MAP</Typography>
      <div>
        {node.items.map((nodeChild: any) => renderComponent(nodeChild))}
      </div>
    </div>
  )
}

export default YamlFlowMap
