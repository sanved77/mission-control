import { Box, Typography } from '@mui/material'
import RocketLaunch from '@mui/icons-material/RocketLaunch'
import SidebarItems from './SidebarItems'
import Favorites from './Favorites'
import CreateNew from './CreateNew'

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--sidebar-bg)',
        color: 'var(--sidebar-text)',
        px: 3,
        pt: 3,
        pb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <RocketLaunch sx={{ color: 'var(--sidebar-accent)', fontSize: 28 }} />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            color: 'var(--sidebar-heading)',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Mission Control
        </Typography>
      </Box>
      <SidebarItems />
      <Favorites />
      <CreateNew />
    </Box>
  )
}
