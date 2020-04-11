import React from 'react'
import Typography from '@material-ui/core/Typography'
import ComponentBoardContext from './ComponentBoardContext'

export interface YamlFlowSeq {
  node: any
}

function YamlFlowSeq({ node }: YamlFlowSeq) {
  const { renderComponent } = React.useContext(ComponentBoardContext)
  console.log('Flow seq node:', node)

  return (
    <div>
      <Typography>FLOW MAP</Typography>
      <div>{node.items.map((nodeChild) => renderComponent(nodeChild))}</div>
    </div>
  )
}

export default YamlFlowSeq
