export interface LogEntry {
  id: string
  timestamp: number
  action: string
  content: string
}

export const NOTIFICATION_TO_ACTION: Record<string, string> = {
  'task-completed': 'Completed task',
  'task-added': 'Added task',
  'blocker-added': 'Added blocker',
  'blocker-dismissed': 'Resolved blocker',
  'question-added': 'Added question',
  'question-resolved': 'Resolved question',
  'project-created': 'Created project',
  'project-tracked': 'Tracked project',
  'project-untracked': 'Untracked project',
  'parking-added': 'Parked',
}

export const ACTION_COLORS: Record<string, string> = {
  'Completed task': '#3fb950',
  'Resolved blocker': '#3fb950',
  'Resolved question': '#3fb950',
  'Added blocker': '#f85149',
  'Added question': '#e3b341',
  'Added task': '#8b949e',
  'Created project': '#39d2c0',
  'Tracked project': '#58a6ff',
  'Untracked project': '#8b949e',
  'Parked': '#bc8cff',
  'Manual': '#58a6ff',
}
