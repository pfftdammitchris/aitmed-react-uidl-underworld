import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import BoardPanel from './BoardPanel'
import YamlQuoteDouble from './YamlQuoteDouble'
import YamlMap from './YamlMap'
import YamlSeq from './YamlSeq'

export interface YamlPairProps {
  node: any
}

function YamlPair({ node }: YamlPairProps) {
  const [key, setKey] = React.useState(node.value)
  const [value, setValue] = React.useState('')

  let children

  if (node.type === 'PLAIN') {
    children = (
      <BoardPanel label={key} inline>
        <TextField
          name=""
          value={node.value}
          onChange={(e) => setKey(e.target.value)}
          fullWidth
        />
      </BoardPanel>
    )
  }

  if (node.type === 'QUOTE_DOUBLE') {
    children = <YamlQuoteDouble node={node} />
  }

  if (node.type === 'MAP') {
    children = <YamlMap node={node} />
  }

  if (node.type === 'SEQ') {
    children = <YamlSeq node={node} />
  }

  return children
}

export default YamlPair
