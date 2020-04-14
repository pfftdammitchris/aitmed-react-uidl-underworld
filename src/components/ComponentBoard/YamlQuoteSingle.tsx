import React from 'react'
import Typography from '@material-ui/core/Typography'

function YamlQuoteSingle({ node }: any) {
  return <Typography>QUOTE_SINGLE: {node.value}</Typography>
}

export default YamlQuoteSingle
