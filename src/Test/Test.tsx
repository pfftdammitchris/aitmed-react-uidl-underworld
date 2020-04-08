import React from 'react'
import styled from 'styled-components'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import MinimizeIcon from '@material-ui/icons/Minimize'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import TitleIcon from '@material-ui/icons/Title'
import ListIcon from '@material-ui/icons/List'
import PhotoSizeSelectSmallIcon from '@material-ui/icons/PhotoSizeSelectSmall'
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone'
import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import BurstModeIcon from '@material-ui/icons/BurstMode'
import MouseIcon from '@material-ui/icons/Mouse'
import HttpIcon from '@material-ui/icons/Http'
import SectionContentRow from './SectionContentRow'

export interface TestProps {
  //
}

const StyledSectionContent = styled(Typography)``

function Section({
  label,
  children,
  ...rest
}: {
  label?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <ExpansionPanel {...rest}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="div">{label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const componentKeys = [
  {
    icon: <RadioButtonCheckedIcon />,
    title: 'button',
    description: 'Resolves to a <button /> html dom element',
  },
  {
    icon: <MinimizeIcon />,
    title: 'divider',
    description: 'Resolves to an <hr /> html dom element',
  },
  {
    icon: <PhotoSizeSelectActualIcon />,
    title: 'image',
    description: 'Resolves to an <img /> html dom element',
  },
  {
    icon: <TitleIcon />,
    title: 'label',
    description: 'Resolves to a <div /> html dom element',
  },
  {
    icon: <ListIcon />,
    title: 'list',
    description: 'Resolves to a <div /> html dom element',
  },
  {
    icon: <PhotoSizeSelectSmallIcon />,
    title: 'select',
    description: 'Resolves to a <select /> html dom element',
  },
  {
    icon: <TextRotationNoneIcon />,
    title: 'textField',
    description: 'Resolves to an <input /> html dom element',
  },
  {
    icon: <ViewCompactIcon />,
    title: 'view',
    description: 'Resolves to a <div /> html dom element',
  },
]

const mouseIcon = <MouseIcon />
const functionKeys = [
  {
    icon: mouseIcon,
    title: 'onClick',
    description: 'Resolves to an onClick function',
  },
  {
    icon: mouseIcon,
    title: 'onHover',
    description: 'Resolves to an onHover function',
  },
]

const assetKeys = [
  {
    icon: <BurstModeIcon />,
    title: 'path',
    description:
      'Combines base url, appends /assets/ and concatenates path in the end',
  },
  {
    icon: <HttpIcon />,
    title: 'resource',
    description:
      'For some components, it\'s set to rename it to "src" to support elements like <img /> during render phase',
  },
]

function Test(props: TestProps) {
  return (
    <div>
      <Section label="Component types">
        <StyledSectionContent>
          {componentKeys.map((props, index: number) => (
            <SectionContentRow key={`uidl-component${index}`} {...props} />
          ))}
        </StyledSectionContent>
      </Section>
      <Section label="Functions">
        <StyledSectionContent>
          {functionKeys.map((props, index: number) => (
            <SectionContentRow key={`uidl-function${index}`} {...props} />
          ))}
        </StyledSectionContent>
      </Section>
      <Section label="Assets">
        <StyledSectionContent>
          {assetKeys.map((props, index: number) => (
            <SectionContentRow key={`uidl-function${index}`} {...props} />
          ))}
        </StyledSectionContent>
      </Section>
    </div>
  )
}

export default Test
