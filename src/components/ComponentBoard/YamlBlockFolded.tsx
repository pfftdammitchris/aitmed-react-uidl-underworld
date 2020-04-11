import React from 'react'
import Typography from '@material-ui/core/Typography'

export interface YamlBlockFoldedProps {
  node: any
}

function YamlBlockFolded({ node }: YamlBlockFoldedProps) {
  return <Typography>BLOCK FOLDED: {node.value}</Typography>
}

export default YamlBlockFolded
