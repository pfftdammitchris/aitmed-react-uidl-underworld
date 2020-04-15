import styled from 'styled-components'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'

export const StyledBadge = styled(Badge)`
  margin: 0 15px;
  :hover {
    transform: scale(1.1);
    transition: all 0.1s ease-out;
  }
`

export const StyledCaption = styled(Typography)`
  font-weight: 700 !important;
`

export const StyledList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`

export const StyledListLabel = styled.span`
  color: cyan;
`

export const StyledListItem = styled.li`
  padding-left: 10px;
`
