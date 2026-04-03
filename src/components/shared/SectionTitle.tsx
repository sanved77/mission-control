import { Typography } from '@mui/material'
import { sectionHeaderTypographySx } from '../../styles/sectionHeaderSx'

export default function SectionTitle({
  children,
  color,
}: {
  children: React.ReactNode
  color: string
}) {
  return (
    <Typography
      sx={{
        ...sectionHeaderTypographySx,
        color,
        mb: '10px',
      }}
    >
      {children}
    </Typography>
  )
}
