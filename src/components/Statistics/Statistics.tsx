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
  font-weight: 700 !important;
`

const StyledList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`

const StyledListLabel = styled.li`
  padding: 0;
  margin: 0;
  font-style: italic;
  text-transform: uppercase;
  color: cyan;
  font-weight: 700;
`

const StyledListItem = styled.li`
  padding-left: 10px;
`

function renderList(label: string, children: React.ReactNode[]) {
  return <StyledList>{children}</StyledList>
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
      tooltipTitle: renderList(
        'Component Ids',
        ids.components.map((componentId: string) => (
          <StyledListItem key={componentId}>{componentId}</StyledListItem>
        )),
      ),
    },
    {
      title: 'Component Types',
      badgeContent: ids.componentTypes.length,
      icon: <MergeTypeIcon />,
      tooltipTitle: renderList(
        'Component Types',
        ids.componentTypes.map((componentType: string) => (
          <StyledListItem key={componentType}>{componentType}</StyledListItem>
        )),
      ),
    },
    {
      title: 'Functions',
      badgeContent: ids.functions.length,
      icon: <FunctionsIcon />,
      tooltipTitle: renderList(
        'Functions',
        ids.functions.map((fnName: string) => (
          <StyledListItem key={fnName}>{fnName}</StyledListItem>
        )),
      ),
    },
    {
      title: 'Class names',
      badgeContent: ids.classNames.length,
      icon: <StyleIcon />,
      tooltipTitle: renderList(
        'Class Names',
        ids.classNames.map((clsn: string) => (
          <StyledListItem key={clsn}>{clsn}</StyledListItem>
        )),
      ),
    },
    {
      title: 'Texts',
      badgeContent: ids.texts.length,
      icon: <TextFieldsIcon />,
      tooltipTitle: renderList(
        'Texts',
        ids.texts.map((text: string) => (
          <StyledListItem key={text}>{text}</StyledListItem>
        )),
      ),
    },
    {
      title: 'Data Models',
      badgeContent: ids.dataModels.length,
      icon: <StorageIcon />,
      tooltipTitle: renderList(
        'Data Models',
        ids.dataModels.map((dataModelId: string) => (
          <StyledListItem key={dataModelId}>{dataModelId}</StyledListItem>
        )),
      ),
    },
    {
      title: 'Data IDs',
      badgeContent: ids.dataIds.length,
      icon: <FingerprintIcon />,
      tooltipTitle: renderList(
        'Data Ids',
        ids.dataIds.map((dataId: string) => (
          <StyledListItem key={dataId}>{dataId}</StyledListItem>
        )),
      ),
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
            <Tooltip title={tooltipTitle} placement="top" enterDelay={0}>
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
                <Typography
                  style={{
                    color: 'cyan',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                  variant="caption"
                >
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
