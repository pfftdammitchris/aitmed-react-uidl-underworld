import React from 'react'
import yaml from 'yaml'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ComponentBoardContext from './ComponentBoardContext'
import useComponentBoard from 'hooks/useComponentBoard'
import YamlSeq from './YamlSeq'

function ComponentBoard() {
  const { renderComponent } = React.useContext(ComponentBoardContext)
  const { paths, ids = [], ymlDoc } = useComponentBoard({
    yml: '',
  })

  function renderRootPair(node: any, index: number): any {
    let children

    // Key/Value
    if (node.value?.type === 'PLAIN') {
      let label, body

      if (node.key?.type === 'PLAIN') {
        label = node.key.value
      }

      if (node.value?.type === 'PLAIN') {
        body = (
          <>
            <div style={{ width: 12 }} />
            <TextField
              name={label as string}
              value={node.value.value}
              fullWidth
            />
          </>
        )
      }

      children = (
        <Grid style={{ display: 'flex', alignItems: 'center' }} xs={12} item>
          <InputLabel>{label}</InputLabel>
          <div>{body}</div>
        </Grid>
      )
    }

    //   // Key/Object mapping
    //   else if (node.value?.type === 'MAP') {
    //     let label, body

    //     if (node.key?.type === 'PLAIN') {
    //       label = node.key.value
    //     }

    //     if (Array.isArray(node.value.items)) {
    //       body = node.value.items.map((nodeChild) => {
    //         return renderComponent(nodeChild)
    //       })
    //     }

    //     children = (
    //       <Grid xs={12} item>
    //         <InputLabel>{label}</InputLabel>
    //         <div>{body}</div>
    //       </Grid>
    //     )
    //   }

    //   // Key/Array mapping
    //   else if (node.value?.type === 'SEQ') {
    //     let label

    //     if (node.key?.type === 'PLAIN') {
    //       label = node.key.value
    //     }

    //     children = (
    //       <Grid xs={12} item>
    //         <InputLabel>{label}</InputLabel>
    //         <div>
    //           <YamlSeq node={node} />
    //         </div>
    //       </Grid>
    //     )
    //   }

    //   return children || null
  }

  let children

  if (typeof ymlDoc.current !== 'string') {
    if (ymlDoc.current.contents?.type === 'MAP') {
      children = ymlDoc.current.contents.items.map(
        (node: any, index: number) => {
          return (
            <React.Fragment key={`rootNode${index}`}>
              {node.type === 'PAIR' ? renderRootPair(node, index) : null}
            </React.Fragment>
          )
        },
      )
    }
  }

  return (
    <Grid
      style={{ padding: 12, boxSizing: 'border-box', width: '100%' }}
      spacing={8}
      container
    >
      {children}
    </Grid>
  )
}

export default ComponentBoard
