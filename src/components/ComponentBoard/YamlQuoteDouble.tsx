import React from 'react'
import TextField from '@material-ui/core/TextField'
import BoardPanel from './BoardPanel'

export interface YamlQuoteDoubleProps {
  keyNode?: any
  valueNode?: any
  node?: any
}

function YamlQuoteDouble({ keyNode, valueNode }: any) {
  const [value, setValue] = React.useState(keyNode.value)

  return (
    <BoardPanel label={keyNode.value} inline>
      <TextField
        name={keyNode.value}
        value={valueNode.value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
    </BoardPanel>
  )
}

export default YamlQuoteDouble
