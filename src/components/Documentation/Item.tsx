import React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

export interface DocumentationItemProps {
  icon: React.ReactNode
  title?: string
  description?: string
  disabled?: boolean
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

function DocumentationItem({
  icon,
  title,
  description,
  disabled = false,
}: DocumentationItemProps) {
  return (
    <List dense>
      <ListItem disabled={disabled}>
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

export default DocumentationItem
