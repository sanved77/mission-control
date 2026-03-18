import { useState, useEffect, useCallback } from 'react'
import type { Project } from '../types/projects'

const STORAGE_KEY = 'projects'

function isValidBlockerEntry(item: unknown): item is { text: string; dismissed?: boolean } {
  if (item == null || typeof item !== 'object') return false
  const o = item as Record<string, unknown>
  return typeof o.text === 'string'
}

function isValidProject(item: unknown): item is Project {
  if (item == null || typeof item !== 'object') return false
  const o = item as Record<string, unknown>
  if (
    typeof o.id !== 'string' ||
    typeof o.projectName !== 'string' ||
    typeof o.description !== 'string' ||
    !Array.isArray(o.blockers) ||
    !Array.isArray(o.questions) ||
    !Array.isArray(o.links) ||
    typeof o.createdOn !== 'number'
  )
    return false
  return (o.blockers as unknown[]).every(isValidBlockerEntry)
}

function getProjectsFromStorage(): Project[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return null
    if (parsed.length === 0) return null
    for (const item of parsed) {
      if (!isValidProject(item)) return null
    }
    return parsed as Project[]
  } catch {
    return null
  }
}

function getFakeProjects(): Project[] {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000
  const projectId = 'proj-1'

  return [
    {
      id: projectId,
      projectName: 'Auth Module',
      description: 'Auth module redesign and performance work',
      blockers: [
        { text: 'External API timeout is preventing end-to-end testing of the new auth flow.' },
        { text: 'Legal approval pending for updated privacy policy before launch.' },
      ],
      questions: [
        'Should we support legacy browser polyfills for the new dashboard?',
        'What is the expected peak load for the Black Friday event?',
      ],
      links: [
        { label: 'Confluence Docs', url: '#', type: 'Doc' },
        { label: 'Log Explorer', url: '#', type: 'Doc' },
        { label: 'Pull Requests', url: '#', type: 'Code' },
        { label: 'Telemetry Dash', url: '#', type: 'Telemetry' },
        { label: 'UML Diagrams', url: '#', type: 'Design' },
        { label: 'User Research', url: '#', type: 'Design' },
        { label: 'AWS Console', url: '#', type: 'Development' },
        { label: 'Temporal UI', url: '#', type: 'Development' },
      ],
      createdOn: now - 30 * day,
      deadlineOn: now + 14 * day,
      completedOn: undefined,
    },
  ]
}

export function useProjects(): {
  projects: Project[]
  setBlockerDismissed: (projectId: string, blockerIndex: number) => void
  updateProjectName: (projectId: string, projectName: string) => void
  updateProjectDescription: (projectId: string, description: string) => void
} {
  const [projects, setProjects] = useState<Project[]>(() => getProjectsFromStorage() ?? getFakeProjects())

  useEffect(() => {
    const stored = getProjectsFromStorage()
    if (stored === null || stored.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(getFakeProjects()))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const setBlockerDismissed = useCallback((projectId: string, blockerIndex: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId || !Array.isArray(p.blockers) || blockerIndex < 0 || blockerIndex >= p.blockers.length)
          return p
        const blockers = p.blockers.map((b, i) => (i === blockerIndex ? { ...b, dismissed: true } : b))
        return { ...p, blockers }
      })
    )
  }, [])

  const updateProjectName = useCallback((projectId: string, projectName: string) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, projectName } : p)))
  }, [])

  const updateProjectDescription = useCallback((projectId: string, description: string) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, description } : p)))
  }, [])

  return { projects, setBlockerDismissed, updateProjectName, updateProjectDescription }
}
