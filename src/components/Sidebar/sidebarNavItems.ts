import type { SvgIconComponent } from '@mui/icons-material'
import Today from '@mui/icons-material/Today'
import EditNote from '@mui/icons-material/EditNote'
import Folder from '@mui/icons-material/Folder'
import TaskAlt from '@mui/icons-material/TaskAlt'
import Settings from '@mui/icons-material/Settings'

export interface SidebarItemConfig {
  id: string
  label: string
  path: string
  Icon: SvgIconComponent
}

/** Nav items for sidebar. path is '#' for now; replace with React Router paths later. */
export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  { id: 'today', label: 'Today', path: '#', Icon: Today },
  { id: 'scratchpad', label: 'Scratchpad', path: '#', Icon: EditNote },
  { id: 'projects', label: 'Projects', path: '#', Icon: Folder },
  { id: 'tasks', label: 'Tasks', path: '#', Icon: TaskAlt },
  { id: 'settings', label: 'Settings', path: '#', Icon: Settings },
]
