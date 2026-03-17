import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import HelpOutline from '@mui/icons-material/HelpOutline'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'

export interface QuestionsSectionProps {
  questions: string[]
}

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
  const [resolved, setResolved] = useState<Set<number>>(new Set())
  if (questions.length === 0) return null

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
        <HelpOutline sx={{ fontSize: 18, color: 'var(--scratchpad-text-muted)' }} />
        <Typography variant="subtitle2" sx={{ color: 'var(--scratchpad-text)', fontWeight: 600 }}>
          Open Questions
        </Typography>
      </Box>
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
    </Box>
  )
}
