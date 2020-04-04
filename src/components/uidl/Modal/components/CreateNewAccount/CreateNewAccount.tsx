import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import AppContext from 'AppContext'
import AuthContext from 'AuthContext'
import { log } from 'utils'
import Actions from 'components/common/Actions'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import useCreateNewAccount from 'hooks/useCreateNewAccount'
import { ModalComponentProps } from '../types'

const StyledFieldsContainer = styled.div`
  input {
    margin: 6px 0;
  }
`

const StyledLoadingMsg = styled.p`
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
`

const StyledErrMsg = styled.p`
  color: red;
  text-align: center;
`

function CreateNewAccountModalComponent({ close }: ModalComponentProps) {
  const appCtx = React.useContext(AppContext)
  const authCtx = React.useContext(AuthContext)
  const [validateMsg, setValidateMsg] = React.useState('')
  const c = useCreateNewAccount()

  if (!appCtx) return null

  function onSubmit(values: any) {
    log({ msg: 'onSubmit form values', data: values, color: '#057979' })
  }

  return (
    <Form
      onSubmit={onSubmit}
      subscription={{
        submitting: true,
        submitError: true,
      }}
      render={({ handleSubmit, submitError, submitting }) => (
        <form onSubmit={handleSubmit}>
          {submitting && <StyledLoadingMsg>Sending...</StyledLoadingMsg>}
          {/* {!pending && error && <StyledErrMsg>{error.message}</StyledErrMsg>}
          {!pending && validateMsg && (
            <StyledErrMsg>{validateMsg}</StyledErrMsg>
          )} */}
          <StyledFieldsContainer>
            <Field
              name="first_name"
              render={({ input, meta, ...rest }) => (
                <Input {...input} {...rest} />
              )}
            />
            <Field
              name="last_name"
              render={({ input, meta, ...rest }) => (
                <Input {...input} {...rest} />
              )}
            />
            <Field
              name="password"
              render={({ input, meta, ...rest }) => (
                <Input {...input} {...rest} />
              )}
            />
          </StyledFieldsContainer>
          <Actions>
            <Button type="button" onClick={close}>
              Back
            </Button>
            <Button type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Actions>
        </form>
      )}
    />
  )
}

export default CreateNewAccountModalComponent
