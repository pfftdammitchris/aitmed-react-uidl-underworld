import React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

export interface SectionContentRowProps {
  icon: React.ReactNode
  title?: string
  description?: string
}

const StyledAvatar = styled(Avatar)`
  background-color: #333 !important;
`

const StyledListItemText = styled(ListItemText)`
  .title {
    font-family: Hack, monospace;
    color: #aa18c4;
  }
`

function SectionContentRow({
  icon,
  title,
  description,
}: SectionContentRowProps) {
  return (
    <List dense>
      <ListItem>
        <ListItemAvatar>
          <StyledAvatar>{icon}</StyledAvatar>
        </ListItemAvatar>
        <StyledListItemText
          classes={{
            primary: 'title',
          }}
          primary={title}
          secondary={description}
        />
      </ListItem>
    </List>
  )
}

export default SectionContentRow
