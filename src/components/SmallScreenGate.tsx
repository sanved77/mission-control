import { type ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { APP_FONT_FAMILY, APP_CONTENT_FONT_WEIGHT } from '../styles/appFont'

const MIN_WIDTH = 768

export default function SmallScreenGate({ children }: { children: ReactNode }) {
  const isWideEnough = useMediaQuery(`(min-width: ${MIN_WIDTH}px)`)

  if (isWideEnough) return <>{children}</>

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--main-content-bg)',
        px: 4,
      }}
    >
      <Typography
        sx={{
          fontFamily: APP_FONT_FAMILY,
          fontWeight: APP_CONTENT_FONT_WEIGHT,
          color: 'var(--sidebar-text)',
          fontSize: '1.1rem',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        📱 Smaller screens are not supported yet.
      </Typography>
    </Box>
  )
}
