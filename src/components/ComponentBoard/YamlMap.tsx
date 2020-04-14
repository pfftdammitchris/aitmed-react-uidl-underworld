import React from 'react'
import ComponentBoardContext from './ComponentBoardContext'
import BoardPanel from './BoardPanel'

export interface YamlMapProps {
  node: any
}

function YamlMap({ node }: YamlMapProps) {
  const { renderComponent } = React.useContext(ComponentBoardContext)

  const children = node.items.map((nodeChild: any) =>
    renderComponent(nodeChild),
  )
  if (node) {
    return (
      <BoardPanel label={node.value}>
        <div>{children}</div>
      </BoardPanel>
    )
  }
  return children || null
}

export default YamlMap
