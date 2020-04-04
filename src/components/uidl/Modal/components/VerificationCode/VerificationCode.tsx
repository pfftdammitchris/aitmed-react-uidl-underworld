import React from 'react'
import styled from 'styled-components'
import AppContext from 'AppContext'
import AuthContext from 'AuthContext'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Actions from 'components/common/Actions'
import useVerificationCode from 'hooks/useVerificationCode'
import { ModalComponentProps } from '../types'

const StyledLoadingMsg = styled.p`
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
`

const StyledErrMsg = styled.p`
  color: red;
  text-align: center;
`

function VerificationCodeModalComponent({ close }: ModalComponentProps) {
  const appCtx = React.useContext(AppContext)
  const authCtx = React.useContext(AuthContext)
  const { sendVerificationCode, pending, error } = useVerificationCode()
  const [value, setValue] = React.useState('')
  const [validateMsg, setValidateMsg] = React.useState('')

  if (!appCtx) return null

  async function onSubmit(e: React.SyntheticEvent<any>) {
    if (!value) {
      return setValidateMsg('Verification code is required')
    }
    if (String(value).length < 6) {
      return setValidateMsg('You provided an invalid 6 digit verification code')
    }
    if (validateMsg) setValidateMsg('')
    await sendVerificationCode(value)
    if (close) close()
  }

  function onClose(e: React.MouseEvent<HTMLButtonElement>) {
    if (close) close()
    authCtx.setPendingVCode?.(false)
  }

  function onKeyPress(e: React.KeyboardEvent<HTMLElement>) {
    if (e.charCode === 13) onSubmit(e)
  }

  return (
    <>
      {pending && <StyledLoadingMsg>Sending...</StyledLoadingMsg>}
      {!pending && error && <StyledErrMsg>{error.message}</StyledErrMsg>}
      {!pending && validateMsg && <StyledErrMsg>{validateMsg}</StyledErrMsg>}
      <div style={{ margin: '10px 0' }}>
        <Input
          id="verificationCodeTextField"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={onKeyPress}
          style={appCtx.css?.textField}
          autoFocus
        />
      </div>
      <Actions>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={onSubmit}>
          Submit
        </Button>
      </Actions>
    </>
  )
}

export default VerificationCodeModalComponent
