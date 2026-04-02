import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export default function CreateNew() {
  const navigate = useNavigate()

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={() =>
        navigate('/projects', { state: { openCreateProject: true } })
      }
      sx={{
        mt: 'auto',
        py: 1.25,
        borderRadius: 3,
        backgroundColor: 'var(--sidebar-accent)',
        color: 'var(--color-on-accent)',
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'var(--sidebar-accent)',
          filter: 'brightness(1.1)',
        },
      }}
    >
      + New
    </Button>
  )
}
