import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { endOfDay } from "../../../../utils/dateRangeFilter";

const MAX_NAME_LENGTH = 200;
const MAX_DESC_LENGTH = 1000;

function parseDeadlineDate(isoDate: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const day = Number(m[3]);
  const date = new Date(y, mo, day);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  createProject: (
    projectName: string,
    description: string,
    deadlineOnMs?: number,
  ) => string;
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
  const [deadlineDate, setDeadlineDate] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);
  const [deadlineError, setDeadlineError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setNameError(null);
      setDescError(null);
    } else {
      setDeadlineDate("");
      setDeadlineError(null);
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
  const trimmedDeadline = deadlineDate.trim();
  const parsedDeadline =
    trimmedDeadline === "" ? null : parseDeadlineDate(trimmedDeadline);
  const deadlineValid = trimmedDeadline === "" || parsedDeadline != null;
  const formValid = nameValid && descValid && deadlineValid;

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
    if (trimmedDeadline !== "" && parsedDeadline == null) {
      setDeadlineError("Choose a valid deadline date.");
      ok = false;
    } else {
      setDeadlineError(null);
    }
    return ok;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const td = deadlineDate.trim();
    const deadlineOnMs =
      td === ""
        ? undefined
        : (() => {
            const d = parseDeadlineDate(td);
            if (d == null) return undefined;
            return endOfDay(d).getTime();
          })();
    const id = createProject(trimmedName, trimmedDesc, deadlineOnMs);
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
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Deadline (optional)"
          type="date"
          fullWidth
          value={deadlineDate}
          onChange={(e) => {
            setDeadlineDate(e.target.value);
            setDeadlineError(null);
          }}
          error={deadlineError != null}
          helperText={
            deadlineError ??
            "Leave empty for no deadline; otherwise end of day in your local timezone"
          }
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { "aria-label": "Project deadline (optional)" },
          }}
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
