import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { SIDEBAR_ITEMS } from './sidebarNavItems'

export default function SidebarItems() {
  const { pathname } = useLocation()

  return (
    <List disablePadding dense sx={{ pt: 2.5 }}>
      {SIDEBAR_ITEMS.map(({ id, label, path, Icon }) => {
        const isActive = path === '/' ? pathname === '/' : pathname === path
        return (
          <ListItemButton
            key={id}
            component={NavLink}
            to={path}
            end={path === '/'}
            sx={{
              borderRadius: '20px',
              mb: 0,
              py: 0.5,
              color: 'var(--sidebar-nav-text)',
              '&.Mui-selected': {
                backgroundColor: 'var(--sidebar-selected-bg)',
                color: 'var(--sidebar-accent)',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'var(--sidebar-selected-bg)',
                },
              },
              '&:hover': {
                backgroundColor: 'var(--sidebar-selected-bg)',
                color: 'var(--sidebar-nav-text)',
              },
            }}
            selected={isActive}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: 'inherit',
              }}
            >
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ fontWeight: isActive ? 600 : 400, fontSize: '0.875rem' }}
            />
          </ListItemButton>
        )
      })}
    </List>
  )
}
