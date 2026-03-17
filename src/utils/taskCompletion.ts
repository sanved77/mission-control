import type { Task } from '../types/projects'

/**
 * Recursively determines if a task is completed.
 * - If the task has subtasks: returns true only when all subtasks are completed (AND).
 * - If the task has no subtasks: returns true when completedOn is set.
 */
export function isCompleted(task: Task | undefined, taskMap: Map<string, Task>): boolean {
  if (task == null) return false
  const subTasks = task.subTasks
  if (subTasks == null || subTasks.length === 0) {
    return task.completedOn != null
  }
  return subTasks.every((id) => isCompleted(taskMap.get(id), taskMap))
}
