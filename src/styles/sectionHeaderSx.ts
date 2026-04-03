/** Monospace stack aligned with Today page body copy */
export const SECTION_HEADER_FONT_STACK =
  '"SF Mono", "Fira Code", "Cascadia Code", monospace'

/** Single source of truth for section header font size (Today, project pages, etc.) */
export const SECTION_HEADER_FONT_SIZE = '15px'

export const sectionHeaderTypographySx = {
  fontFamily: SECTION_HEADER_FONT_STACK,
  fontSize: SECTION_HEADER_FONT_SIZE,
  fontWeight: 700,
  fontStyle: 'normal' as const,
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
}

/** Keeps header action buttons in layout while hidden (avoids CLS on hover) */
export const sectionHeaderActionHiddenSx = {
  visibility: 'hidden' as const,
  pointerEvents: 'none' as const,
}

/** Use on the flex row that contains the section title + optional action controls */
export const sectionHeaderRowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: '10px',
}

export const SECTION_HEADER_COLORS = {
  todaysPlan: '#e3b341',
  contextLinks: '#2196f3',
  trackedProjects: '#39d2c0',
  parkingLot: '#bc8cff',
  blockers: '#f85149',
  openQuestions: '#e3b341',
  tasks: '#39d2c0',
  trackedProjectsHome: '#39d2c0',
  allProjectsHome: '#e3b341',
} as const
