import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useProjects } from "../../../../hooks/useProjects";
import { useSnackbarContext } from "../../../../contexts/useSnackbarContext";
import CreateProjectDialog from "./CreateProjectDialog";

export default function ProjectHome() {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const { showSnackbar } = useSnackbarContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "var(--projects-bg)",
        color: "var(--scratchpad-text)",
        minHeight: "100%",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Projects
      </Typography>
      <Typography variant="body2" sx={{ color: "var(--scratchpad-text-muted)", mb: 2 }}>
        Create a project to open it here.
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setDialogOpen(true)}
        sx={{ bgcolor: "var(--projects-metric-color)" }}
      >
        Create project
      </Button>
      <CreateProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        createProject={createProject}
        onCreated={(projectId) => {
          showSnackbar("success", "Project created");
          navigate(`/projects/${projectId}`);
        }}
      />
    </Box>
  );
}
