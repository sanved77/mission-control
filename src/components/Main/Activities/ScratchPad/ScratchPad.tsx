import { useState } from 'react'
import { Box } from '@mui/material'
import Toolbar from './Toolbar'
import ScratchPadEditor from './Editor'

function getWordCount(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).filter(Boolean).length
}

export default function ScratchPad() {
  const [content, setContent] = useState('')
  const characterCount = content.length
  const wordCount = getWordCount(content)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--scratchpad-editor-bg)',
        color: 'var(--scratchpad-text)',
        overflow: 'hidden',
      }}
    >
      <Toolbar characterCount={characterCount} wordCount={wordCount} />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ScratchPadEditor value={content} onChange={setContent} />
      </Box>
    </Box>
  )
}
