import { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import ContentAddDialog from "./ContentAddDialog";
import type { Question } from "../../../../types/projects";
import {
  SECTION_HEADER_COLORS,
  sectionHeaderActionHiddenSx,
  sectionHeaderRowSx,
  sectionHeaderTypographySx,
} from "../../../../styles/sectionHeaderSx";

export interface QuestionsSectionProps {
  questions: Question[];
  onAddQuestion?: (text: string) => void;
  onToggleResolved?: (questionId: string) => void;
}

export default function QuestionsSection({
  questions,
  onAddQuestion,
  onToggleResolved,
}: QuestionsSectionProps) {
  const [hoveredOn, setHoveredOn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={sectionHeaderRowSx}
        onMouseEnter={() => setHoveredOn(true)}
        onMouseLeave={() => setHoveredOn(false)}
      >
        <Typography
          sx={{
            ...sectionHeaderTypographySx,
            color: SECTION_HEADER_COLORS.openQuestions,
          }}
        >
          Open Questions
        </Typography>

        {onAddQuestion && (
          <Tooltip title="Add question" placement="top">
            <IconButton
              size="small"
              onClick={() => setDialogOpen(true)}
              tabIndex={hoveredOn ? 0 : -1}
              sx={{
                p: 0.5,
                width: 24,
                height: 24,
                flexShrink: 0,
                borderRadius: "50%",
                color: "var(--color-on-accent)",
                bgcolor: "var(--projects-questions-color)",
                "&:hover": {
                  bgcolor: "var(--projects-questions-color)",
                  opacity: 0.9,
                },
                ...(hoveredOn ? {} : sectionHeaderActionHiddenSx),
              }}
              aria-hidden={!hoveredOn}
              aria-label="Add question"
            >
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {questions.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {questions.map((q) => {
            const isResolved = q.resolvedOn != null;
            return (
              <Box
                key={q.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  p: 1.5,
                  borderLeft: "4px solid var(--projects-questions-color)",
                  bgcolor: "rgba(255,255,255,0.03)",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--scratchpad-text)",
                    flex: 1,
                    textDecoration: isResolved ? "line-through" : "none",
                    opacity: isResolved ? 0.7 : 1,
                  }}
                >
                  {q.text}
                </Typography>
                <Tooltip
                  title={isResolved ? "Mark unresolved" : "Mark resolved"}
                  placement="top"
                >
                  <IconButton
                    size="small"
                    onClick={() => onToggleResolved?.(q.id)}
                    sx={{ p: 0.25 }}
                    aria-label={isResolved ? "Mark unresolved" : "Mark resolved"}
                  >
                    <CheckCircleOutline
                      sx={{
                        fontSize: 18,
                        color: isResolved
                          ? "var(--tasks-complete-color)"
                          : "var(--scratchpad-text-muted)",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: "var(--scratchpad-text-muted)",
            fontStyle: "italic",
          }}
        >
          No open questions
        </Typography>
      )}
      <ContentAddDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="question"
        onAdd={(text) => onAddQuestion?.(text)}
      />
    </Box>
  );
}
