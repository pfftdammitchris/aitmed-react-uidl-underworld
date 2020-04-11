import React from 'react'
import Typography from '@material-ui/core/Typography'

export interface YamlBlockLiteralProps {
  node: any
}

function YamlBlockLiteral({ node }: YamlBlockLiteralProps) {
  return <Typography>BLOCK LITERAL: {node.value}</Typography>
}

export default YamlBlockLiteral
