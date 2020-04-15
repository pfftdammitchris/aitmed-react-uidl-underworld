import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'
import isEmpty from 'lodash/isEmpty'
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
import {
  StyledBadge,
  StyledCaption,
  StyledList,
  StyledListLabel,
  StyledListItem,
} from './styled'

export interface StatisticsProps {
  parsedYml: null | UIDLPage
  parsingErrored?: boolean
}

function renderList(items: string[]) {
  return (
    <StyledList>
      {items.map((item: string) => (
        <StyledListItem key={item}>{item}</StyledListItem>
      ))}
    </StyledList>
  )
}

function getBadges(
  ids: Record<string, string[]>,
): (Partial<Omit<TooltipProps, 'title'>> & {
  title: string
  icon: React.ReactNode
  tooltipTitle: React.ReactNode
  badgeContent: number
})[] {
  return [
    {
      title: 'Component IDs',
      badgeContent: ids.components.length,
      icon: <LabelIcon />,
      tooltipTitle: renderList(ids.components),
    },
    {
      title: 'Component Types',
      badgeContent: ids.componentTypes.length,
      icon: <MergeTypeIcon />,
      tooltipTitle: renderList(ids.componentTypes),
    },
    {
      title: 'Functions',
      badgeContent: ids.functions.length,
      icon: <FunctionsIcon />,
      tooltipTitle: renderList(ids.functions),
    },
    {
      title: 'Class names',
      badgeContent: ids.classNames.length,
      icon: <StyleIcon />,
      tooltipTitle: renderList(ids.classNames),
    },
    {
      title: 'Texts',
      badgeContent: ids.texts.length,
      icon: <TextFieldsIcon />,
      tooltipTitle: renderList(ids.texts),
    },
    {
      title: 'Data Models',
      badgeContent: ids.dataModels.length,
      icon: <StorageIcon />,
      tooltipTitle: renderList(ids.dataModels),
    },
    {
      title: 'Data IDs',
      badgeContent: ids.dataIds.length,
      icon: <FingerprintIcon />,
      tooltipTitle: renderList(ids.dataIds),
    },
  ]
}

function Statistics({ parsedYml, parsingErrored }: StatisticsProps) {
  const stats = usePageStatistics({
    parsedYml,
  })

  if (isEmpty(parsedYml)) {
    return (
      <Grow in>
        <StyledCaption style={{ color: '#09dc47' }} variant="overline">
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

  const statisticBadges = getBadges(ids)

  return (
    <>
      {statisticBadges.map(
        (
          { title, badgeContent, icon, tooltipTitle = '', ...rest },
          index: number,
        ) =>
          badgeContent ? (
            <Tooltip
              key={title}
              title={tooltipTitle}
              placement="top"
              enterDelay={0}
            >
              <div>
                <StyledBadge
                  key={`statistic-badge${index}`}
                  title={title}
                  badgeContent={badgeContent}
                  max={99}
                  // @ts-ignore
                  color={badgeContent ? 'secondary' : 'default'}
                  showZero
                  {...rest}
                >
                  {icon}
                </StyledBadge>
                <Typography component={StyledListLabel} variant="caption">
                  {title}
                </Typography>
              </div>
            </Tooltip>
          ) : null,
      )}
    </>
  )
}

export default React.memo(Statistics)
