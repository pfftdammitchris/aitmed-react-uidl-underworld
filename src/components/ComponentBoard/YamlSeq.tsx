import React from 'react'
import TextField from '@material-ui/core/TextField'
import ComponentBoardContext from './ComponentBoardContext'
import BoardPanel from './BoardPanel'

export interface YamlSeqProps {
  node: any
}

function YamlSeq({ node }: YamlSeqProps) {
  const { renderComponent } = React.useContext(ComponentBoardContext)
  const keyNode = node.key
  const valueNode = node.value

  const children = valueNode?.items?.map((nodeChild) =>
    renderComponent(nodeChild),
  )
  console.log(node)
  return (
    <BoardPanel label={keyNode.value}>
      <TextField name={keyNode.value} value={keyNode.value} />
      <div>{children}</div>
    </BoardPanel>
  )
}

export default YamlSeq
