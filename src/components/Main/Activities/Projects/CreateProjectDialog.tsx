import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const MAX_NAME_LENGTH = 200;
const MAX_DESC_LENGTH = 1000;

export interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  createProject: (projectName: string, description: string) => string;
  onCreated: (projectId: string) => void;
}

export default function CreateProjectDialog({
  open,
  onClose,
  createProject,
  onCreated,
}: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setNameError(null);
      setDescError(null);
    }
  }, [open]);

  const trimmedName = name.trim();
  const trimmedDesc = description.trim();
  const nameValid =
    trimmedName.length > 0 &&
    trimmedName.length <= MAX_NAME_LENGTH;
  const descValid =
    trimmedDesc.length > 0 &&
    trimmedDesc.length <= MAX_DESC_LENGTH;
  const formValid = nameValid && descValid;

  const validate = (): boolean => {
    let ok = true;
    if (trimmedName.length === 0) {
      setNameError("Project name is required.");
      ok = false;
    } else if (trimmedName.length > MAX_NAME_LENGTH) {
      setNameError(`Name must be ${MAX_NAME_LENGTH} characters or less.`);
      ok = false;
    } else {
      setNameError(null);
    }
    if (trimmedDesc.length === 0) {
      setDescError("Description is required.");
      ok = false;
    } else if (trimmedDesc.length > MAX_DESC_LENGTH) {
      setDescError(`Description must be ${MAX_DESC_LENGTH} characters or less.`);
      ok = false;
    } else {
      setDescError(null);
    }
    return ok;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const id = createProject(trimmedName, trimmedDesc);
    onCreated(id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="create-project-dialog-title"
    >
      <DialogTitle id="create-project-dialog-title">Create project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project name"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null);
          }}
          error={nameError != null}
          helperText={nameError ?? `${trimmedName.length}/${MAX_NAME_LENGTH}`}
          slotProps={{ htmlInput: { maxLength: MAX_NAME_LENGTH } }}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Project description"
          fullWidth
          multiline
          minRows={3}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setDescError(null);
          }}
          error={descError != null}
          helperText={
            descError ?? `${trimmedDesc.length}/${MAX_DESC_LENGTH}`
          }
          slotProps={{ htmlInput: { maxLength: MAX_DESC_LENGTH } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formValid}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
