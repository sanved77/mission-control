export interface LinkObj {
  label: string
  url: string
  type?: string
}

export interface BlockerEntry {
  text: string
  dismissed?: boolean
}

export interface Task {
  id: string
  content: string
  createdOn: number
  deadlineOn?: number
  completedOn?: number
  projectID?: string
  subTasks?: string[]
}

export interface Project {
  id: string
  projectName: string
  description: string
  blockers: BlockerEntry[]
  questions: string[]
  links: LinkObj[]
  createdOn: number
  deadlineOn?: number
  completedOn?: number
}
