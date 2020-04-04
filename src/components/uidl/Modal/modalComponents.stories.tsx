import React from 'react'
import Modal from './Modal'

export default {
  title: 'Modal components',
  component: Modal,
}

export const VerificationCode = () => {
  const [opened, setOpened] = React.useState(true)

  return (
    <Modal
      name="verification.code"
      title="New Device"
      subtitle="Please input the verification code we sent to: +1 6262468491"
      isOpen={opened}
      close={() => setOpened(false)}
    />
  )
}

VerificationCode.story = { name: 'VerificationCode' }

export const CreateNewAccount = () => {
  const [opened, setOpened] = React.useState(true)

  return (
    <Modal
      name="create.account"
      title="Create Account"
      isOpen={opened}
      close={() => setOpened(false)}
    />
  )
}

CreateNewAccount.story = { name: 'CreateNewAccount' }
// eabithabrown
