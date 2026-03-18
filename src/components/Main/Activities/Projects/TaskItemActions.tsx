import { IconButton, Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Archive from "@mui/icons-material/Archive";
import Unarchive from "@mui/icons-material/Unarchive";
import Delete from "@mui/icons-material/Delete";
import type { Task } from "../../../../types/projects";

const accentButtonSx = {
  color: "#ffffff",
  p: 0.25,
  mt: 0.25,
  bgcolor: "var(--projects-metric-color)",
  "&:hover": {
    bgcolor: "var(--projects-metric-color)",
  },
  borderRadius: "4px",
} as const;

const deleteButtonSx = {
  color: "#ffffff",
  p: 0.25,
  mt: 0.25,
  bgcolor: "#E67373",
  "&:hover": {
    bgcolor: "#E67373",
  },
  borderRadius: "4px",
} as const;

export interface TaskItemActionsProps {
  task: Task;
  showAddIcon: boolean;
  showArchiveButton: boolean;
  showDeleteButton: boolean;
  onAddClick: (taskId: string) => void;
  onArchiveClick: (taskId: string, archived: boolean) => void;
  onDeleteClick: () => void;
}

export default function TaskItemActions({
  task,
  showAddIcon,
  showArchiveButton,
  showDeleteButton,
  onAddClick,
  onArchiveClick,
  onDeleteClick,
}: TaskItemActionsProps) {
  return (
    <Stack ml={1.5} direction="row" gap={1} sx={{ alignItems: "center" }}>
      {showAddIcon && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onAddClick(task.id);
          }}
          sx={accentButtonSx}
          aria-label="Add subtask"
        >
          <Add sx={{ fontSize: 18 }} />
        </IconButton>
      )}
      {showArchiveButton && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onArchiveClick(task.id, !(task.isArchived ?? false));
          }}
          sx={accentButtonSx}
          aria-label={task.isArchived ? "Unarchive task" : "Archive task"}
        >
          {task.isArchived ? (
            <Unarchive sx={{ fontSize: 18 }} />
          ) : (
            <Archive sx={{ fontSize: 18 }} />
          )}
        </IconButton>
      )}
      {showDeleteButton && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
          sx={deleteButtonSx}
          aria-label="Delete task"
        >
          <Delete sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Stack>
  );
}
