import styled from 'styled-components'

export interface StyledButtonOptions {
  background?: string
  backgroundColor?: string
}

const StyledButton = styled.button<StyledButtonOptions>`
  padding: 14px 12px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  outline: none;
  border-radius: 4px;
  border: 0;
  color: rgba(0, 0, 0, 0.7);
  background-color: ${({ background, backgroundColor }) =>
    background || backgroundColor || 'rgba(0, 0, 0, 0.08)'};
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`

export default StyledButton
