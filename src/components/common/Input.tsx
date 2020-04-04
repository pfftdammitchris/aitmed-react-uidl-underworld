import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 12px;
  font-size: 14px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  background-color: #fff;

  :hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  ::placeholder {
    opacity: 0.6;
  }
`

export default StyledInput
