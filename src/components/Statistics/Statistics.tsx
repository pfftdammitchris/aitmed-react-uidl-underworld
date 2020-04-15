import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'
import isEmpty from 'lodash/isEmpty'
import MuiBadge from '@material-ui/core/Badge'
import styled from 'styled-components'
import { UIDLPage } from '@aitmed/react-uidl'
import LabelIcon from '@material-ui/icons/Label'
import MergeTypeIcon from '@material-ui/icons/MergeType'
import FunctionsIcon from '@material-ui/icons/Functions'
import StyleIcon from '@material-ui/icons/Style'
import StorageIcon from '@material-ui/icons/Storage'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import usePageStatistics from 'hooks/usePageStatistics'
import Tooltip, { TooltipProps } from 'components/common/Tooltip'

export interface StatisticsProps {
  parsedYml: null | UIDLPage
  parsingErrored?: boolean
}

const StyledBadge = styled(MuiBadge)`
  margin: 0 15px;
  :hover {
    transform: scale(1.1);
    transition: all 0.1s ease-out;
  }
`

const StyledCaption = styled(Typography)`
  color: #09dc47;
  font-weight: 700 !important;
`

function Statistics({ parsedYml, parsingErrored }: StatisticsProps) {
  const stats = usePageStatistics({
    parsedYml,
  })

  if (isEmpty(parsedYml)) {
    return (
      <Grow in>
        <StyledCaption variant="overline">
          &nbsp;&nbsp;&nbsp; Waiting for YAML content...
        </StyledCaption>
      </Grow>
    )
  }

  if (typeof parsedYml !== 'object') {
    return null
  }

  if (parsingErrored) {
    return (
      <Grow in>
        <StyledCaption color="error" variant="overline">
          &nbsp;&nbsp;&nbsp; A parsing error occurred
        </StyledCaption>
      </Grow>
    )
  }

  const {
    ids,
    paths,
    resources,
    components,
    componentTypes,
    functions,
    classNames,
    texts,
    dataIds,
    placeholders,
  } = stats

  const statisticBadges: (Partial<TooltipProps> & {
    icon: React.ReactNode
    tooltipTemplate: string
    tooltipPlacement: 'top' | 'bottom'
    badgeContent: number
  })[] = [
    {
      title: 'Component IDs',
      badgeContent: ids.components.length,
      icon: <LabelIcon />,
      tooltipTemplate: 'components',
      tooltipPlacement: 'top',
    },
    {
      title: 'Component Types',
      badgeContent: ids.componentTypes.length,
      icon: <MergeTypeIcon />,
      tooltipTemplate: 'component types',
      tooltipPlacement: 'bottom',
    },
    {
      title: 'Functions',
      badgeContent: ids.functions.length,
      icon: <FunctionsIcon />,
      tooltipTemplate: 'functions',
      tooltipPlacement: 'top',
    },
    {
      title: 'Class names',
      badgeContent: ids.classNames.length,
      icon: <StyleIcon />,
      tooltipTemplate: 'classnames',
      tooltipPlacement: 'bottom',
    },
    {
      title: 'Texts',
      badgeContent: ids.texts.length,
      icon: <TextFieldsIcon />,
      tooltipTemplate: 'texts',
      tooltipPlacement: 'top',
    },
    {
      title: 'Data Models',
      badgeContent: ids.dataModels.length,
      icon: <StorageIcon />,
      tooltipTemplate: 'data models',
      tooltipPlacement: 'bottom',
    },
    {
      title: 'Data IDs',
      badgeContent: ids.dataIds.length,
      icon: <FingerprintIcon />,
      tooltipTemplate: 'data ids',
      tooltipPlacement: 'top',
    },
  ]

  return (
    <>
      {statisticBadges.map(
        (
          {
            title,
            badgeContent,
            icon,
            tooltipTemplate = '',
            tooltipPlacement,
            ...rest
          },
          index: number,
        ) => (
          <Tooltip
            title={
              typeof badgeContent === 'number'
                ? tooltipTemplate.replace(/\%count/g, String(badgeContent))
                : null
            }
            placement={tooltipPlacement}
            enterTouchDelay={50}
            open={!!badgeContent}
          >
            <StyledBadge
              key={`statistic-badge${index}`}
              badgeContent={badgeContent}
              max={99}
              // @ts-ignore
              color={badgeContent ? 'secondary' : 'default'}
              showZero
              {...rest}
            >
              {icon}
            </StyledBadge>
          </Tooltip>
        ),
      )}
    </>
  )
}

export default React.memo(Statistics)
