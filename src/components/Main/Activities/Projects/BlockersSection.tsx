import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import Add from '@mui/icons-material/Add'
import CancelOutlined from '@mui/icons-material/CancelOutlined'
import Close from '@mui/icons-material/Close'
import type { BlockerEntry } from '../../../../types/projects'
import ContentAddDialog from './ContentAddDialog'

export interface BlockersSectionProps {
  blockers: BlockerEntry[]
  onDismissBlocker?: (index: number) => void
  onAddBlocker?: (text: string) => void
}

export default function BlockersSection({ blockers, onDismissBlocker, onAddBlocker }: BlockersSectionProps) {
  const [hoveredOn, setHoveredOn] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const visible = blockers.filter((b) => !b.dismissed)

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}
        onMouseEnter={() => setHoveredOn(true)}
        onMouseLeave={() => setHoveredOn(false)}
      >
        <CancelOutlined sx={{ fontSize: 18, color: '#e57373' }} />
        <Typography variant="subtitle2" sx={{ color: 'var(--scratchpad-text)', fontWeight: 600 }}>
          Blockers
        </Typography>
        {onAddBlocker && (
          <Box sx={{ width: 24, height: 24, flexShrink: 0, pl: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => setDialogOpen(true)}
              sx={{
                p: 0.5,
                width: 24,
                height: 24,
                borderRadius: '50%',
                visibility: hoveredOn ? 'visible' : 'hidden',
                color: '#ffffff',
                bgcolor: 'var(--projects-metric-color)',
                '&:hover': { bgcolor: 'var(--projects-metric-color)', opacity: 0.9 },
              }}
              aria-label="Add blocker"
            >
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {visible.length > 0 && (
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
      )}
      <ContentAddDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="blocker"
        onAdd={(text) => onAddBlocker?.(text)}
      />
    </Box>
  )
}
