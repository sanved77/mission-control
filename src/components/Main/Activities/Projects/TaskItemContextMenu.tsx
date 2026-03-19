import {
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Archive from "@mui/icons-material/Archive";
import Unarchive from "@mui/icons-material/Unarchive";
import Delete from "@mui/icons-material/Delete";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Info from "@mui/icons-material/Info";
import type { Task } from "../../../../types/projects";

export interface TaskItemContextMenuProps {
  open: boolean;
  contextMenu: { mouseX: number; mouseY: number } | null;
  task: Task;
  onClose: () => void;
  onAddSubtask: () => void;
  onToggleArchive: () => void;
  onDelete: () => void;
  onDuplicate: (taskId: string) => void;
}

export default function TaskItemContextMenu({
  open,
  contextMenu,
  task,
  onClose,
  onAddSubtask,
  onToggleArchive,
  onDelete,
  onDuplicate,
}: TaskItemContextMenuProps) {
  const archived = task.isArchived ?? false;

  const handleAddSubtask = () => {
    onAddSubtask();
    onClose();
  };

  const handleToggleArchive = () => {
    onToggleArchive();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleDuplicate = () => {
    onDuplicate(task.id);
    onClose();
  };

  const handleInfo = () => {
    onClose();
  };

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      MenuListProps={{
        "aria-labelledby": "task-context-menu",
      }}
    >
      <MenuItem
        onClick={handleAddSubtask}
        disabled={archived}
      >
        <ListItemIcon>
          <Add fontSize="small" />
        </ListItemIcon>
        Add Subtask
      </MenuItem>
      <MenuItem onClick={handleToggleArchive}>
        <ListItemIcon>
          {archived ? (
            <Unarchive fontSize="small" />
          ) : (
            <Archive fontSize="small" />
          )}
        </ListItemIcon>
        {archived ? "Unarchive" : "Archive"}
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>
      <MenuItem onClick={handleDuplicate}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        Duplicate
      </MenuItem>
      <MenuItem onClick={handleInfo}>
        <ListItemIcon>
          <Info fontSize="small" />
        </ListItemIcon>
        Info
      </MenuItem>
    </Menu>
  );
}
