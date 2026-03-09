import { Button } from '@mui/material'

export default function CreateNew() {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={() => {}}
      sx={{
        mt: 'auto',
        py: 1.25,
        borderRadius: 3,
        backgroundColor: 'var(--sidebar-accent)',
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'var(--sidebar-accent)',
          filter: 'brightness(1.1)',
        },
      }}
    >
      + New Task
    </Button>
  )
}
