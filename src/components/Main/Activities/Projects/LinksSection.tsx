import { useCallback, useState, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import type { LinkObj } from "../../../../types/projects";
import { getLinkTypeConfig } from "../../../../utils/linkTypeConfig";
import {
  SECTION_HEADER_COLORS,
  sectionHeaderActionHiddenSx,
  sectionHeaderRowSx,
  sectionHeaderTypographySx,
} from "../../../../styles/sectionHeaderSx";
import LinkAddDialog from "./LinkAddDialog";
import LinkContextMenu from "./LinkContextMenu";

const getConfigForType = getLinkTypeConfig;

export interface LinksSectionProps {
  links: LinkObj[];
  onAddLink?: (link: { label: string; url: string; type: string }) => void;
  onEditLink?: (linkId: string, update: { label: string; url: string; type: string }) => void;
  onDeleteLink?: (linkId: string) => void;
  isLinkTracked?: (linkId: string) => boolean;
  onToggleLinkTracked?: (linkId: string) => void;
  /** When set, left-click uses this instead of native navigation (visit tracking + recents). */
  onLinkClick?: (linkId: string, url: string) => void;
}

export default function LinksSection({
  links,
  onAddLink,
  onEditLink,
  onDeleteLink,
  isLinkTracked,
  onToggleLinkTracked,
  onLinkClick,
}: LinksSectionProps) {
  const [hoveredOn, setHoveredOn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    link: LinkObj;
  } | null>(null);
  const [editLink, setEditLink] = useState<LinkObj | null>(null);
  const [deleteLink, setDeleteLink] = useState<LinkObj | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent, link: LinkObj) => {
    e.preventDefault();
    setContextMenu({ mouseX: e.clientX, mouseY: e.clientY, link });
  }, []);

  const handleCloseContextMenu = useCallback(() => setContextMenu(null), []);

  const handleEditFromMenu = useCallback(() => {
    if (contextMenu) {
      setEditLink(contextMenu.link);
    }
  }, [contextMenu]);

  const handleDeleteFromMenu = useCallback(() => {
    if (contextMenu) {
      setDeleteLink(contextMenu.link);
    }
  }, [contextMenu]);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteLink) {
      onDeleteLink?.(deleteLink.id);
      setDeleteLink(null);
    }
  }, [deleteLink, onDeleteLink]);

  const handleDeleteCancel = useCallback(() => setDeleteLink(null), []);

  const handleDeleteKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") handleDeleteCancel();
      if (e.key === "Enter") {
        e.preventDefault();
        handleDeleteConfirm();
      }
    },
    [handleDeleteCancel, handleDeleteConfirm],
  );
  const sorted = useMemo(
    () => [...links].sort((a, b) => a.label.localeCompare(b.label)),
    [links],
  );

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
            color: SECTION_HEADER_COLORS.contextLinks,
          }}
        >
          Context Links
        </Typography>
        {onAddLink && (
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
              bgcolor: "var(--projects-metric-color)",
              "&:hover": { bgcolor: "var(--projects-metric-color)", opacity: 0.9 },
              ...(hoveredOn ? {} : sectionHeaderActionHiddenSx),
            }}
            aria-hidden={!hoveredOn}
            aria-label="Add link"
          >
            <Add sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
        {sorted.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: "var(--scratchpad-text-muted)",
              fontStyle: "italic",
            }}
          >
            No links
          </Typography>
        ) : (
          sorted.map((link) => {
            const config = getConfigForType(link.type);
            const Icon = config.Icon;
            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                onClick={(e) => {
                  if (onLinkClick) {
                    e.preventDefault();
                    onLinkClick(link.id, link.url);
                  }
                }}
                onContextMenu={(e) => handleContextMenu(e, link)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  color: "var(--scratchpad-text)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                <Icon
                  sx={{ fontSize: 18, color: config.iconColor }}
                />
                <Typography variant="body2">{link.label}</Typography>
              </Link>
            );
          })
        )}
      </Box>
      <LinkAddDialog
        key={editLink?.id ?? "new"}
        open={dialogOpen || editLink !== null}
        onClose={() => {
          setDialogOpen(false);
          setEditLink(null);
        }}
        {...(editLink
          ? {
              linkId: editLink.id,
              initialLabel: editLink.label,
              initialUrl: editLink.url,
              initialType: editLink.type ?? "Docs",
              onSave: (id, update) => {
                onEditLink?.(id, update);
                setEditLink(null);
              },
            }
          : {
              onAdd: (link) => onAddLink?.(link),
            })}
      />
      <LinkContextMenu
        open={contextMenu !== null}
        contextMenu={contextMenu}
        visitCount={contextMenu?.link.visits ?? 0}
        onClose={handleCloseContextMenu}
        onEdit={handleEditFromMenu}
        onDelete={handleDeleteFromMenu}
        isFavorite={
          contextMenu != null && isLinkTracked != null
            ? isLinkTracked(contextMenu.link.id)
            : false
        }
        onFavoriteToggle={() => {
          if (contextMenu != null && onToggleLinkTracked) {
            onToggleLinkTracked(contextMenu.link.id);
          }
        }}
      />
      <Dialog
        open={deleteLink !== null}
        onClose={handleDeleteCancel}
        onKeyDown={handleDeleteKeyDown}
        aria-labelledby="delete-link-dialog-title"
      >
        <DialogTitle id="delete-link-dialog-title">Delete Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{deleteLink?.label}&quot;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
