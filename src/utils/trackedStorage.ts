export const TRACKED_STORAGE_KEY = 'tracked'

export interface TrackedStorage {
  tasks: string[]
  projects?: string[]
  links?: string[]
}

export function readTrackedStorage(): TrackedStorage {
  if (typeof window === 'undefined') return { tasks: [], projects: [], links: [] }
  try {
    const raw = localStorage.getItem(TRACKED_STORAGE_KEY)
    if (raw === null) return { tasks: [], projects: [], links: [] }
    const parsed = JSON.parse(raw) as unknown
    if (parsed == null || typeof parsed !== 'object') return { tasks: [], projects: [], links: [] }
    const o = parsed as Record<string, unknown>
    const tasks = Array.isArray(o.tasks) && o.tasks.every((id): id is string => typeof id === 'string')
      ? o.tasks
      : []
    const projects =
      Array.isArray(o.projects) && o.projects.every((id): id is string => typeof id === 'string')
        ? o.projects
        : []
    const links =
      Array.isArray(o.links) && o.links.every((id): id is string => typeof id === 'string')
        ? o.links
        : []
    return { tasks, projects, links }
  } catch {
    return { tasks: [], projects: [], links: [] }
  }
}

export function writeTrackedTasks(taskIds: string[]): void {
  if (typeof window === 'undefined') return
  const prev = readTrackedStorage()
  const payload: TrackedStorage = {
    tasks: taskIds,
    projects: prev.projects ?? [],
    links: prev.links ?? [],
  }
  localStorage.setItem(TRACKED_STORAGE_KEY, JSON.stringify(payload))
}

export function writeTrackedProjects(projectIds: string[]): void {
  if (typeof window === 'undefined') return
  const prev = readTrackedStorage()
  const payload: TrackedStorage = {
    tasks: prev.tasks,
    projects: projectIds,
    links: prev.links ?? [],
  }
  localStorage.setItem(TRACKED_STORAGE_KEY, JSON.stringify(payload))
}

export function writeTrackedLinks(linkIds: string[]): void {
  if (typeof window === 'undefined') return
  const prev = readTrackedStorage()
  const payload: TrackedStorage = {
    tasks: prev.tasks,
    projects: prev.projects ?? [],
    links: linkIds,
  }
  localStorage.setItem(TRACKED_STORAGE_KEY, JSON.stringify(payload))
}
