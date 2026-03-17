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

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  { id: 'today', label: 'Today', path: '/', Icon: Today },
  { id: 'scratchpad', label: 'Scratchpad', path: '/scratchpad', Icon: EditNote },
  { id: 'projects', label: 'Projects', path: '/projects', Icon: Folder },
  { id: 'repositories', label: 'Repositories', path: '/repositories', Icon: Folder },
  { id: 'tasks', label: 'Tasks', path: '/tasks', Icon: TaskAlt },
  { id: 'settings', label: 'Settings', path: '/settings', Icon: Settings },
]
