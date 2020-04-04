// Used to render common action components like Button (good for supporting spacing)
import React from 'react'
import styled from 'styled-components'

export interface ActionsProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType<any>
  children: React.ReactNode
  margin?: string | number
}

const StyledRoot = styled.div<ActionsProps>`
  margin: ${({ margin }) =>
    typeof margin !== 'undefined' ? margin : '10px auto'};
  display: flex;
  align-items: center;

  button,
  input,
  select {
    flex-grow: 1;
  }
`

export const StyledSpace = styled.div`
  width: 6px;
  height: auto;
  display: inline-block;
`

function Actions({
  component: Component = StyledRoot,
  children: childrenProp,
  margin,
  ...rest
}: ActionsProps) {
  let children: React.ReactNode[] = React.Children.toArray(childrenProp)

  children = children.map((child, childIndex: number) => {
    if (!React.isValidElement(child)) {
      return null
    }
    return (
      <React.Fragment key={`actions_action${childIndex}`}>
        {React.cloneElement(child, { ...child.props })}
        {childIndex + 1 < children.length && <StyledSpace />}
      </React.Fragment>
    )
  })

  return (
    <Component margin={margin} {...rest}>
      {children}
    </Component>
  )
}

export default Actions
