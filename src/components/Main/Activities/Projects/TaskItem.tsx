import { motion } from 'framer-motion'
import { Box, Checkbox, Typography } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import type { Task } from '../../../../types/projects'
import { isCompleted } from '../../../../utils/taskCompletion'

function getTaskCompletionPercent(task: Task, taskMap: Map<string, Task>): { completed: number; total: number } {
  const hasSubTasks = task.subTasks != null && task.subTasks.length > 0
  let completed = hasSubTasks 
    ? 0 : isCompleted(task, taskMap) 
    ? 1 : 0
  let total = hasSubTasks ? 0 : 1
  for (const id of task.subTasks ?? []) {
    const child = taskMap.get(id)
    if (child) {
      const sub = getTaskCompletionPercent(child, taskMap)
      completed += hasSubTasks ? sub.completed : 0
      total += sub.total
    }
  }
  return { completed, total }
}

function sortChildTasks(subTaskIds: string[], taskMap: Map<string, Task>): Task[] {
  const tasks = subTaskIds.map((id) => taskMap.get(id)).filter((t): t is Task => t != null)
  const incomplete = tasks.filter((t) => !isCompleted(t, taskMap)).sort((a, b) => a.createdOn - b.createdOn)
  const complete = tasks.filter((t) => isCompleted(t, taskMap)).sort((a, b) => a.createdOn - b.createdOn)
  return [...incomplete, ...complete]
}

export interface TaskItemProps {
  task: Task
  taskMap: Map<string, Task>
  indentLevel?: number
  onTaskComplete?: (taskId: string, isComplete: boolean) => void
}

export default function TaskItem({ task, taskMap, indentLevel = 0, onTaskComplete }: TaskItemProps) {
  const subTaskIds = task.subTasks ?? []
  const hasSubTasks = subTaskIds.length > 0
  const completed = isCompleted(task, taskMap)
  const { completed: completedCount, total } = getTaskCompletionPercent(task, taskMap)
  const percentText = hasSubTasks ? `${Math.round((completedCount / total) * 100)}% complete` : null
  const sortedChildren = sortChildTasks(subTaskIds, taskMap)

  return (
    <Box
      component={motion.div}
      layout
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      sx={{ mb: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
          pl: indentLevel * 3,
        }}
      >
        <Checkbox
          size="small"
          checked={completed}
          onChange={() => onTaskComplete?.(task.id, !completed)}
          icon={<CheckBoxOutlineBlankIcon sx={{ color: 'var(--scratchpad-text-muted)' }} />}
          checkedIcon={<CheckBoxIcon sx={{ color: '#4caf50' }} />}
          sx={{ p: 0.25, mt: 0.25 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: completed ? 'var(--scratchpad-text-muted)' : 'var(--scratchpad-text)',
              textDecoration: completed ? 'line-through' : 'none',
            }}
          >
            {task.content}
          </Typography>
          {percentText != null && (
            <Typography variant="caption" sx={{ color: 'var(--scratchpad-text-muted)', display: 'block', mt: 0.25 }}>
              {percentText}
            </Typography>
          )}
        </Box>
      </Box>
      {sortedChildren.map((childTask) => (
        <TaskItem
          key={childTask.id}
          task={childTask}
          taskMap={taskMap}
          indentLevel={indentLevel + 1}
          onTaskComplete={onTaskComplete}
        />
      ))}
    </Box>
  )
}
