import { Box, Button, Divider, IconButton, MenuItem, Select, Typography } from '@mui/material'
import Add from '@mui/icons-material/Add'
import MoreVert from '@mui/icons-material/MoreVert'

const DUMMY_NOTES = [
  { id: '1', label: 'Note 1' },
  { id: '2', label: 'Note 2' },
  { id: 'auth', label: 'Auth Flow' },
]

export interface ToolbarProps {
  characterCount: number
  wordCount: number
  selectedNoteId?: string
  onNoteChange?: (noteId: string) => void
}

export default function Toolbar({
  characterCount,
  wordCount,
  selectedNoteId = DUMMY_NOTES[0].id,
  onNoteChange,
}: ToolbarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--scratchpad-toolbar-bg)',
        color: 'var(--scratchpad-text)',
        px: 1.5,
        py: 1,
        borderBottom: '1px solid var(--scratchpad-separator)',
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <Button
          startIcon={<Add />}
          onClick={() => {}}
          sx={{
            backgroundColor: 'var(--scratchpad-btn-primary-bg)',
            color: 'var(--scratchpad-btn-primary-text)',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--scratchpad-btn-primary-bg)',
              opacity: 0.9,
            },
          }}
        >
          New
        </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'var(--scratchpad-separator)' }} />
        <Select
          value={selectedNoteId}
          onChange={(e) => onNoteChange?.(e.target.value)}
          size="small"
          displayEmpty
          sx={{
            color: 'var(--scratchpad-text-muted)',
            minWidth: 160,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--scratchpad-separator)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--scratchpad-text-muted)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--scratchpad-text-muted)' },
          }}
        >
          {DUMMY_NOTES.map((note) => (
            <MenuItem key={note.id} value={note.id}>
              {note.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={() => {}} sx={{ color: 'var(--scratchpad-text-muted)' }} aria-label="More options">
          <MoreVert fontSize="small" />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Typography variant="caption" sx={{ color: 'var(--scratchpad-text-muted)', fontSize: 11, lineHeight: 1.2 }}>
            Characters: {characterCount}
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--scratchpad-text-muted)', fontSize: 11, lineHeight: 1.2 }}>
            Words: {wordCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
