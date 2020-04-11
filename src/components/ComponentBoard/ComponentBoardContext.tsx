import React from 'react'
import yaml from 'yaml'
import YamlPair from './YamlPair'
import YamlMap from './YamlMap'
import YamlSeq from './YamlSeq'
import YamlBlockFolded from './YamlBlockFolded'
import YamlBlockLiteral from './YamlBlockLiteral'
import YamlFlowMap from './YamlFlowMap'
import YamlFlowSeq from './YamlFlowSeq'

const context = {
  renderComponent,
}

const ComponentBoardContext = React.createContext(context)

function renderComponent(node: yaml.ast.AstNode) {
  let Component: React.ElementType<any>
  if (node.type === 'PAIR') Component = YamlPair
  else if (node.type === 'BLOCK_FOLDED') Component = YamlBlockFolded
  else if (node.type === 'BLOCK_LITERAL') Component = YamlBlockLiteral
  else if (node.type === 'FLOW_MAP') Component = YamlFlowMap
  else if (node.type === 'FLOW_SEQ') Component = YamlFlowSeq
  else if (node.type === 'MAP') Component = YamlMap
  else if (node.type === 'SEQ') Component = YamlSeq
  else console.log('no node types matched')
  return <Component node={node} />
}

export function ComponentBoardProvider({
  children,
  yml,
  setYml,
}: {
  children: React.ReactNode
  yml: string
  setYml: (yml: any) => any
}) {
  const [state, setState] = React.useState(context)

  return (
    <ComponentBoardContext.Provider value={state}>
      {children}
    </ComponentBoardContext.Provider>
  )
}

export default ComponentBoardContext
