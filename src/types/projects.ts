export type ProjectStatus = 'Open' | 'Close' | 'Paused' | 'Blocked'

export type LinkObj = {
  id: string
  label: string
  url: string
  type?: string
  visits: number
}

export interface Blocker {
  id: string
  text: string
  projectId: string
  dismissedOn?: number
}

export interface Question {
  id: string
  text: string
  projectId: string
  resolvedOn?: number
}

export interface Task {
  id: string
  content: string
  createdOn: number
  deadlineOn?: number
  completedOn?: number
  projectID?: string
  subTasks?: string[]
  isArchived?: boolean
}

export interface Project {
  id: string
  projectName: string
  description: string
  blockers: string[]
  questions: string[]
  links: LinkObj[]
  createdOn: number
  deadlineOn?: number
  completedOn?: number
  status?: ProjectStatus
}
