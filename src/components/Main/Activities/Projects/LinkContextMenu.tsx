import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import AdsClick from "@mui/icons-material/AdsClick";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";

export interface LinkContextMenuProps {
  open: boolean;
  contextMenu: { mouseX: number; mouseY: number } | null;
  /** Total visits / clicks recorded for this link */
  visitCount: number;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function LinkContextMenu({
  open,
  contextMenu,
  visitCount,
  onClose,
  onEdit,
  onDelete,
  isFavorite,
  onFavoriteToggle,
}: LinkContextMenuProps) {
  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleFavorite = () => {
    onFavoriteToggle();
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
        "aria-labelledby": "link-context-menu",
      }}
    >
      <MenuItem onClick={handleEdit}>
        <ListItemIcon>
          <Edit fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={handleFavorite}>
        <ListItemIcon>
          {isFavorite ? (
            <Star fontSize="small" />
          ) : (
            <StarBorder fontSize="small" />
          )}
        </ListItemIcon>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>
      <MenuItem
        disabled
        sx={{
          cursor: "default",
          "&.Mui-disabled": {
            opacity: 1,
            color: "var(--scratchpad-text-muted)",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: "var(--scratchpad-text-muted)" }}>
          <AdsClick fontSize="small" />
        </ListItemIcon>
        {visitCount} {visitCount === 1 ? "click" : "clicks"}
      </MenuItem>
    </Menu>
    
  );
}
