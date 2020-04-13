import React from 'react'
import get from 'lodash.get'
import yaml from 'yaml'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ComponentBoardContext from './ComponentBoardContext'
import useComponentBoard from 'hooks/useComponentBoard'
import YamlSeq from './YamlSeq'

export interface ComponentBoardProps {
  yml: string
  setYml: (yml: string) => any
}

const StyledPair = styled(Grid)`
  border: 1px solid teal;
  .label {
    margin-bottom: 10px;
  }
`

const StyledRootBody = styled.div``

function TextInput({ node, setYml, ymlDoc, ...props }) {
  const [value, setValue] = React.useState(node.value.value || '')
  const onChange = (e) => {
    node.value.value = e.target.value
    setValue(e.target.value)
    setYml(ymlDoc.current.toString())
  }
  return <TextField value={value} onChange={onChange} fullWidth {...props} />
}

function ComponentBoard({ yml, setYml }: ComponentBoardProps) {
  const { renderComponent } = React.useContext(ComponentBoardContext)
  const { paths, ids = [], ymlDoc } = useComponentBoard({
    yml,
    setYml,
  })

  function renderRootPair(node: yaml.ast.Pair, index: number) {
    let children

    // Key/Value
    if (node.value?.type === 'PLAIN') {
      let label, body

      if (node.key?.type === 'PLAIN') {
        label = node.key.value
      }

      body = (
        <TextInput
          node={node}
          name={label as string}
          setYml={setYml}
          ymlDoc={ymlDoc}
        />
      )

      children = (
        <StyledPair
          // style={{ display: 'flex', alignItems: 'center' }}
          xs={12}
          item
        >
          <InputLabel className="label">{label}</InputLabel>
          <StyledRootBody>{body}</StyledRootBody>
        </StyledPair>
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

    return children || null
  }

  let children

  if (typeof ymlDoc.current !== 'string') {
    if (ymlDoc.current.contents?.type === 'MAP') {
      children = ymlDoc.current.contents.items.map((node, index: number) => {
        console.log(node)

        return (
          <React.Fragment key={`rootNode${index}`}>
            {node.type === 'PAIR' ? renderRootPair(node, index) : null}
          </React.Fragment>
        )
      })
    }
  }

  return (
    <Grid style={{ margin: '12px 0' }} container>
      {children}
    </Grid>
  )
}

export default ComponentBoard
