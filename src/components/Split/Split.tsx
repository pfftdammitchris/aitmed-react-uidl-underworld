import React from 'react'
import styled from 'styled-components'

export interface SplitProps {
  children: React.ReactNode
}

const StyledSplit = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  .column {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    flex-basis: 50%;
  }
  .borderRight {
    border-right: 1px solid #178c8c;
  }
`

function Split({ children: childrenProp }: SplitProps) {
  let children = React.Children.toArray(childrenProp)
  children = children.map((node, index) => {
    let child
    let className = 'column'
    if (index === 0 && children.length > 0) {
      child = <div className={className}>{node}</div>
    } else {
      child = (
        <div className={className} style={{ width: '100%' }}>
          {node}
        </div>
      )
    }
    return child
  })

  return <StyledSplit>{children}</StyledSplit>
}

export default Split
