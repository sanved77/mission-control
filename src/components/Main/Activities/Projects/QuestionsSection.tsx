import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import Add from '@mui/icons-material/Add'
import HelpOutline from '@mui/icons-material/HelpOutline'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import ContentAddDialog from './ContentAddDialog'

export interface QuestionsSectionProps {
  questions: string[]
  onAddQuestion?: (text: string) => void
}

export default function QuestionsSection({ questions, onAddQuestion }: QuestionsSectionProps) {
  const [resolved, setResolved] = useState<Set<number>>(new Set())
  const [hoveredOn, setHoveredOn] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleResolved = (index: number) => {
    setResolved((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}
        onMouseEnter={() => setHoveredOn(true)}
        onMouseLeave={() => setHoveredOn(false)}
      >
        <HelpOutline sx={{ fontSize: 18, color: 'var(--scratchpad-text-muted)' }} />
        <Typography variant="subtitle2" sx={{ color: 'var(--scratchpad-text)', fontWeight: 600 }}>
          Open Questions
        </Typography>
        {onAddQuestion && (
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
              aria-label="Add question"
            >
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        )}
      </Box>
      {questions.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {questions.map((text, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                p: 1.5,
                borderRadius: 1,
                bgcolor: 'var(--scratchpad-toolbar-bg)',
                border: '1px solid var(--scratchpad-separator)',
              }}
            >
              <Typography variant="body2" sx={{ color: 'var(--scratchpad-text)', flex: 1, textDecoration: resolved.has(i) ? 'line-through' : 'none', opacity: resolved.has(i) ? 0.7 : 1 }}>
                {text}
              </Typography>
              <IconButton size="small" onClick={() => toggleResolved(i)} sx={{ p: 0.25 }} aria-label={resolved.has(i) ? 'Mark unresolved' : 'Mark resolved'}>
                <CheckCircleOutline sx={{ fontSize: 18, color: resolved.has(i) ? '#4caf50' : 'var(--scratchpad-text-muted)' }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <ContentAddDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="question"
        onAdd={(text) => onAddQuestion?.(text)}
      />
    </Box>
  )
}
