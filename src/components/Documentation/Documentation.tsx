import React from 'react'
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
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SearchIcon from '@material-ui/icons/Search'
import DocumentationItem from './Item'

const componentKeys = [
  {
    icon: <RadioButtonCheckedIcon />,
    title: 'button',
    description: 'Resolves to a <button /> html dom element',
  },
  {
    icon: <MinimizeIcon />,
    title: 'dateSelect',
    description: '(Not supported) Resolves to a <TextField /> html dom element',
    disabled: true,
  },
  {
    icon: <MinimizeIcon />,
    title: 'divider',
    description: 'Resolves to an <hr /> html dom element',
  },
  {
    icon: <ViewHeadlineIcon />,
    title: 'header',
    description: 'Resolves to an <div /> html dom element',
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
    description: '(Partially supported) Resolves to a <div /> html dom element',
    disabled: true,
  },
  {
    icon: <SearchIcon />,
    title: 'searchBar',
    description: 'Resolves to an <input /> html dom element',
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
    description: '(Not supported) Resolves to an onHover function',
    disabled: true,
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

const aliasIcon = <ChevronRightIcon />

const aliases = [
  {
    icon: aliasIcon,
    title: 'className',
    description:
      'Searches global css and applies its styles if found (overrides any global styles if it encounters the same style keys)',
  },
  {
    icon: aliasIcon,
    title: 'classNames',
    description:
      'Searches global css and applies each style as they are found (overrides any global styles if it encounters the same style keys)',
  },
  {
    icon: aliasIcon,
    title: 'children',
    description:
      "Components that will render as the current component's children",
  },
  {
    icon: aliasIcon,
    title: 'contentType',
    description: 'Helps provide more specific info for text fields',
  },
  {
    icon: aliasIcon,
    title: 'dataId',
    description:
      '(Partially supported) Value binded to a data model key in the data model',
    disabled: true,
  },
  {
    icon: aliasIcon,
    title: 'dataModel',
    description: '(Partially supported)',
    disabled: true,
  },
  {
    icon: aliasIcon,
    title: 'dataModels',
    description: '(Partially supported)',
    disabled: true,
  },
  {
    icon: aliasIcon,
    title: 'text',
    description: 'Resolves to a <div /> element',
  },
  {
    icon: aliasIcon,
    title: 'textColor',
    description: 'Applies a color to text. Renamed to "color" before rendering',
  },
]

const stylesAliases = [
  {
    title: 'align',
    icon: aliasIcon,
    description:
      'Positioning for an html element, usually on an element containing multiple children',
    Variations: ['centerX', 'centerY'],
  },
  {
    title: 'border',
    icon: aliasIcon,
    description:
      'Describes styles for a border. Transformed and renamed to variety of border style keys before rendering',
  },
  {
    title: 'fontStyle',
    icon: aliasIcon,
    description:
      'Font style for texts. Some values are transformed for fontWeight since they belong there instead',
  },
  {
    title: 'textAlign',
    icon: aliasIcon,
    description:
      'Positioning for an html element, usually on an element containing a single child',
  },
  {
    title: 'width',
    icon: aliasIcon,
    description:
      'Size representing a ratio relative to the viewport (Note: The viewport is the preview with a purple border)',
  },
  {
    title: 'height',
    icon: aliasIcon,
    description:
      'Size representing a ratio relative to the viewport (Note: The viewport is the preview with a purple border)',
  },
  {
    title: 'top',
    icon: aliasIcon,
    description:
      'Distance representing a ratio relative to the viewport (Note: The viewport is the preview with a purple border)',
  },
  {
    title: 'left',
    icon: aliasIcon,
    description:
      'Distance representing a ratio relative to the viewport (Note: The viewport is the preview with a purple border)',
  },
]

function DocumentationSection({
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

function Documentation() {
  return (
    <div style={{ width: '100%' }}>
      <DocumentationSection label="Component types">
        <Typography component="div">
          {componentKeys.map((props, index: number) => (
            <DocumentationItem key={`uidl-component${index}`} {...props} />
          ))}
        </Typography>
      </DocumentationSection>
      <DocumentationSection label="Functions">
        <Typography component="div">
          {functionKeys.map((props, index: number) => (
            <DocumentationItem key={`uidl-function${index}`} {...props} />
          ))}
        </Typography>
      </DocumentationSection>
      <DocumentationSection label="Assets">
        <Typography component="div">
          {assetKeys.map((props, index: number) => (
            <DocumentationItem key={`uidl-asset${index}`} {...props} />
          ))}
        </Typography>
      </DocumentationSection>
      <DocumentationSection label="Aliases (keys)">
        <Typography component="div">
          {aliases.map((props, index: number) => (
            <DocumentationItem key={`uidl-alias${index}`} {...props} />
          ))}
        </Typography>
      </DocumentationSection>
      <DocumentationSection label="Style aliases (keys)">
        <Typography component="div">
          {stylesAliases.map((props, index: number) => (
            <DocumentationItem key={`uidl-alias${index}`} {...props} />
          ))}
        </Typography>
      </DocumentationSection>
    </div>
  )
}

export default React.memo(Documentation, () => true)
