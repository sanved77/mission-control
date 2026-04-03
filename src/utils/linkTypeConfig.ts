import type { ComponentType } from 'react'
import Code from '@mui/icons-material/Code'
import Description from '@mui/icons-material/Description'
import ShowChart from '@mui/icons-material/ShowChart'
import Palette from '@mui/icons-material/Palette'
import Build from '@mui/icons-material/Build'
import LinkIcon from '@mui/icons-material/Link'

export const LINK_TYPE_CONFIG: Record<
  string,
  { Icon: ComponentType<{ sx?: object }>; iconColor: string }
> = {
  Code: { Icon: Code, iconColor: 'var(--scratchpad-text-muted)' },
  Telemetry: { Icon: ShowChart, iconColor: 'var(--link-type-telemetry)' },
  Docs: { Icon: Description, iconColor: 'var(--link-type-docs)' },
  Doc: { Icon: Description, iconColor: 'var(--link-type-docs)' },
  Design: { Icon: Palette, iconColor: 'var(--link-type-design)' },
  Tool: { Icon: Build, iconColor: 'var(--link-type-tool)' },
  Other: { Icon: LinkIcon, iconColor: 'var(--link-type-other)' },
}

export function getLinkTypeConfig(type?: string) {
  if (!type) return LINK_TYPE_CONFIG.Other
  return LINK_TYPE_CONFIG[type] ?? LINK_TYPE_CONFIG.Other
}
