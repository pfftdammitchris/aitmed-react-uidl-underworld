import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import AddIcon from '@material-ui/icons/Add'
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MarkunreadIcon from '@material-ui/icons/Markunread'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'

const StyledToolbar = styled(Toolbar)`
  flex-wrap: wrap;
`

function ToolbarButton({ children, ...props }: any) {
  return (
    <IconButton disabled {...props}>
      {children}
    </IconButton>
  )
}

function YamlEditorToolbar(props) {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <StyledToolbar>
        <ToolbarButton>
          <AddAPhotoIcon />
        </ToolbarButton>
        <ToolbarButton>
          <AddIcon />
        </ToolbarButton>
        <ToolbarButton>
          <AddToHomeScreenIcon />
        </ToolbarButton>
        <ToolbarButton>
          <AssignmentIndIcon />
        </ToolbarButton>
        <ToolbarButton>
          <NoteAddIcon />
        </ToolbarButton>
        <ToolbarButton>
          <VisibilityOffIcon />
        </ToolbarButton>
        <ToolbarButton>
          <ZoomOutMapIcon />
        </ToolbarButton>
        <ToolbarButton>
          <DeleteForeverIcon />
        </ToolbarButton>
        <ToolbarButton>
          <MarkunreadIcon />
        </ToolbarButton>
        <ToolbarButton>
          <PersonAddIcon />
        </ToolbarButton>
        <ToolbarButton>
          <PictureAsPdfIcon />
        </ToolbarButton>
      </StyledToolbar>
    </AppBar>
  )
}

export default YamlEditorToolbar
