import { Box, TextField } from '@mui/material'
import { APP_FONT_FAMILY } from '../../styles/appFont'

const SEARCHBAR_HEIGHT = 65

export default function SearchBar() {
  return (
    <Box
      sx={{
        height: SEARCHBAR_HEIGHT,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        justifyContent: 'center',
        backgroundColor: 'var(--projects-bg)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          pt: 0.75,
        }}
      >
        <TextField
          fullWidth
          placeholder="Quick Capture: Add a task, note, or link instantly..."
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <Box
                component="span"
                sx={{
                  fontFamily: APP_FONT_FAMILY,
                  fontSize: 13,
                  color: 'var(--scratchpad-text-muted)',
                  backgroundColor: 'var(--searchbar-shortcut-bg)',
                  borderRadius: 3,
                  px: 1,
                  py: 0.25,
                  m: 1.5,
                }}
                >
                  Cmd+K
                </Box>
              ),
              sx: {
                bgcolor: 'var(--tasks-panel-bg)',
                borderRadius: 9999,
                '& fieldset': { border: 'none' },
                '& input': {
                  color: 'var(--scratchpad-text)',
                  py: 1.25,
                  '&::placeholder': {
                    color: 'var(--scratchpad-text-muted)',
                    opacity: 1,
                  },
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  )
}
