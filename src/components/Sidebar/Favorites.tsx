import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

/* Stub: will be replaced by Redux later. */
const STUB_FAVORITES = [
  { id: '1', name: 'API Refactor', color: '#00a3ff' },
  { id: '2', name: 'Dashboard Redesign', color: '#7c4dff' },
  { id: '3', name: 'Auth Flow', color: '#00bfa5' },
]

export default function Favorites() {
  return (
    <>
      <Typography
        component="div"
        sx={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'var(--sidebar-text)',
          opacity: 0.8,
          mt: 3.5,
          mb: 1.5,
          px: 1.5,
        }}
      >
        FAVORITES
      </Typography>
      <List disablePadding dense>
        {STUB_FAVORITES.map(({ id, name, color }) => (
          <ListItemButton
            key={id}
            component="a"
            href="#"
            sx={{
              borderRadius: 1,
              mb: 0,
              py: 0.5,
              color: 'var(--sidebar-heading)',
              '&:hover': {
                backgroundColor: 'var(--sidebar-selected-bg)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: color,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={name} primaryTypographyProps={{ fontSize: '0.875rem' }} />
          </ListItemButton>
        ))}
      </List>
    </>
  )
}
