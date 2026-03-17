import { Box, IconButton, Typography } from '@mui/material'
import CancelOutlined from '@mui/icons-material/CancelOutlined'
import Close from '@mui/icons-material/Close'
import type { BlockerEntry } from '../../../../types/projects'

export interface BlockersSectionProps {
  blockers: BlockerEntry[]
  onDismissBlocker?: (index: number) => void
}

export default function BlockersSection({ blockers, onDismissBlocker }: BlockersSectionProps) {
  const visible = blockers.filter((b) => !b.dismissed)
  if (visible.length === 0) return null
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
        <CancelOutlined sx={{ fontSize: 18, color: '#e57373' }} />
        <Typography variant="subtitle2" sx={{ color: 'var(--scratchpad-text)', fontWeight: 600 }}>
          Blockers
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {blockers.map((entry, i) => {
          if (entry.dismissed) return null
          return (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                p: 1.5,
                borderRadius: 1,
                bgcolor: 'rgba(229, 115, 115, 0.15)',
                border: '1px solid rgba(229, 115, 115, 0.3)',
              }}
            >
              <Typography variant="body2" sx={{ color: 'var(--scratchpad-text)', flex: 1 }}>
                {entry.text}
              </Typography>
              <IconButton
                size="small"
                onClick={() => onDismissBlocker?.(i)}
                sx={{ p: 0.25, color: 'var(--scratchpad-text-muted)' }}
                aria-label="Dismiss blocker"
              >
                <Close sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
