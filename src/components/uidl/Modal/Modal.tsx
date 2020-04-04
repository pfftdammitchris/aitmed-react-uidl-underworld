import React from 'react'
import styled from 'styled-components'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import { log } from 'utils'
import components from './components'

export type ModalComponentKey = 'create.account' | 'verification.code' | ''

export interface ModalProps extends ReactModalProps {
  children?: React.ReactNode
  containerProps?: React.HTMLAttributes<any> & {
    component?: React.ElementType<any>
  }
  contentProps?: React.HTMLAttributes<any> & {
    component?: React.ElementType<any>
  }
  name: ModalComponentKey
  title?: string
  subtitle?: string
  renderTitle?: () => React.ReactNode
  renderSubtitle?: () => React.ReactNode
  close: () => void
}

const StyledHeader = styled.h3`
  text-align: center;
  margin-bottom: 0;
`

const StyledP = styled.p`
  text-align: center;
`

function Modal({
  name,
  title,
  subtitle,
  isOpen,
  close,
  containerProps = {},
  contentProps = {},
  renderTitle,
  renderSubtitle,
  ...rest
}: ModalProps) {
  // @ts-ignore
  const ModalComponent = components[name]

  if (!ModalComponent) {
    log({ msg: `No modal component found for "${name}"`, color: 'red' })
    return null
  }

  const ContentContainer = containerProps['component'] || 'div'
  const Content = contentProps['component'] || 'div'
  const modalComponentProps = {
    title,
    subtitle,
    close,
  }

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      className="modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
      }}
      {...rest}
    >
      <ContentContainer
        {...containerProps}
        style={{
          margin: 12,
          width: '100%',
          height: '100%',
          maxWidth: 400,
          maxHeight: 280,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 6,
          padding: '6px 12px',
          ...containerProps?.style,
        }}
      >
        <Content {...contentProps}>
          {renderTitle
            ? renderTitle()
            : title && <StyledHeader>{title}</StyledHeader>}
          {renderSubtitle
            ? renderSubtitle()
            : subtitle && <StyledP>{subtitle}</StyledP>}
          <ModalComponent {...modalComponentProps} />
        </Content>
      </ContentContainer>
    </ReactModal>
  )
}

export default Modal
