import { useState, useCallback, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export type ContentAddType = "blocker" | "question";

export interface ContentAddDialogProps {
  open: boolean;
  onClose: () => void;
  type: ContentAddType;
  onAdd: (text: string) => void;
}

const TITLE_BY_TYPE: Record<ContentAddType, string> = {
  blocker: "Add new Blocker",
  question: "Add new Question",
};

export default function ContentAddDialog({
  open,
  onClose,
  type,
  onAdd,
}: ContentAddDialogProps) {
  const [text, setText] = useState("");

  const resetAndClose = useCallback(() => {
    setText("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) setText("");
  }, [open]);

  const handleAdd = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onAdd(trimmed);
    resetAndClose();
  }, [text, onAdd, resetAndClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleAdd();
      }
    },
    [handleAdd, resetAndClose],
  );

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      onKeyDown={handleKeyDown}
      aria-labelledby="content-add-dialog-title"
    >
      <DialogTitle id="content-add-dialog-title">{TITLE_BY_TYPE[type]}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          sx={{ mt: 1, minWidth: 320 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!text.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
