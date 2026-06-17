import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Checkbox,
} from "@mui/material";
import type { Session } from "../../../../../shared/types/sessions";
import {
  Pencil,
  Archive,
  Trash2,
  MoreVertical,
  ArchiveRestore,
  X,
} from "lucide-react";
import { STATUS_COLORS } from "../../../const/statusColors";
import { muiThemeStyles } from "../../../../../shared/const/muiThemeStyles";
import { finalDuration } from "../../../helper/finalDuration";

export type SessionComponentProps = {
  sessions: Session[];

  navigateToSessionDetails: (id: Session["id"]) => void;
  editSession: (id: Session["id"]) => void;
  
  openModalarchiveSession: (id: Session["id"]) => void;
  openModalsoftDeleteSession: (id: Session["id"]) => void;

  restoreArchivedSession: (id: Session["id"]) => void;

  openMoreActions: (id: Session["id"]) => void;
  cancelMoreActions: () => void;
  activeSessionId: Session["id"] | null;

  selectedSessionIds: string[];
  toggleSessionSelection: (id: string) => void;
  toggleSelectAll: () => void;
};

export default function SessionComponent({
  sessions,
  navigateToSessionDetails,
  editSession,
  openModalarchiveSession,
  openModalsoftDeleteSession,

  openMoreActions,
  cancelMoreActions,
  restoreArchivedSession,
  activeSessionId,

  selectedSessionIds,
  toggleSessionSelection,
  toggleSelectAll,
}: SessionComponentProps) {
  return (
    <div className="session-component-wrapper">
      <TableContainer component={Paper} sx={muiThemeStyles.tableContainer}>
        <Table
          stickyHeader
          sx={{
            minWidth: 1000,
          }}
        >
          <TableHead>
            <TableRow sx={muiThemeStyles.tableRow}>
              <TableCell>
                <Checkbox
                  checked={
                    sessions.length > 0 &&
                    selectedSessionIds.length === sessions.length
                  }
                  indeterminate={
                    selectedSessionIds.length > 0 &&
                    selectedSessionIds.length < sessions.length
                  }
                  onChange={toggleSelectAll}
                  size="small"
                  color="default"
                  
                />
                
              </TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Title</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Description</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Status</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Mood</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Due date</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Duration</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Skills</TableCell>
              <TableCell sx={muiThemeStyles.tableHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sessions.map((s) => (
              <TableRow
                key={s.id}
                hover
                onClick={() => navigateToSessionDetails(s.id)}
                sx={muiThemeStyles.tableRow}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedSessionIds.includes(s.id)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleSessionSelection(s.id)}
                    color="default"
                  />
                </TableCell>
                <TableCell sx={muiThemeStyles.tableHeader}>{s.title}</TableCell>

                <TableCell sx={muiThemeStyles.tableHeader}>
                  <Tooltip title={s.description ?? ""}>
                    <span className="description-text">
                      {s.description
                        ? s.description.length > 50
                          ? `${s.description.slice(0, 50)}...`
                          : s.description
                        : "No Description specified"}
                    </span>
                  </Tooltip>
                </TableCell>

                <TableCell sx={muiThemeStyles.tableHeader}>
                  <Chip
                    label={s.status}
                    size="small"
                    sx={{
                      backgroundColor: STATUS_COLORS[s.status],
                      fontWeight: 600,
                      color: "white",
                    }}
                  />
                </TableCell>
                <TableCell sx={muiThemeStyles.tableHeader}>
                  <Chip
                    label={s.mood}
                    size="small"
                    sx={muiThemeStyles.skillChip}
                  />
                </TableCell>
                <TableCell sx={muiThemeStyles.tableHeader}>
                  {" "}
                  {s.dueDate ? s.dueDate : "No due date specified by user"}{" "}
                </TableCell>
                <TableCell sx={muiThemeStyles.tableHeader}>
                  {finalDuration(s.duration)}
                </TableCell>

                <TableCell sx={muiThemeStyles.tableHeader}>
                  <div className="skills-container">
                    {s.skills.slice(0, 3).map((skill) => (
                      <Chip
                        size="small"
                        key={skill}
                        label={skill}
                        variant="outlined"
                        sx={muiThemeStyles.skillChip}
                      />
                    ))}

                    {s.skills.length > 3 && (
                      <Chip
                        size="small"
                        label={`+${s.skills.length - 3}`}
                        sx={muiThemeStyles.skillChip}
                      />
                    )}
                  </div>

                  {s.skills.length === 0 && <span className="no-skills"> No skills specified  </span>}
                </TableCell>

                <TableCell sx={muiThemeStyles.tableHeader}>
  <div className="actions-cell">
    {selectedSessionIds.length === 0 && (
      <div className="actions-main">
        <Tooltip title="Edit">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              editSession(s.id);
            }}
            color="primary"
            sx={{
              "&:hover": {
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Pencil size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={
            s.deletedAt !== null
              ? `${s.title} is already deleted`
              : "Delete Session"
          }
        >
          <span>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                openModalsoftDeleteSession(s.id);
                cancelMoreActions();
              }}
              color="error"
              disabled={s.deletedAt !== null}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  transform:
                    s.deletedAt === null
                      ? "translateY(-2px)"
                      : "none",
                  "&.Mui-disabled": {
                    color: "#ef4444",
                    opacity: 0.6,
                  },
                },
              }}
            >
              <Trash2 size={18} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="More actions">
          <span>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                openMoreActions(s.id);
              }}
              color="default"
              disabled={s.deletedAt !== null}
              sx={muiThemeStyles.heading}
            >
              <MoreVertical size={18} />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    )}

    {activeSessionId === s.id &&
      selectedSessionIds.length === 0 && (
        <div className="more-actions-container">
          <div className="more-actions-header">
            <span>Actions</span>

            <Tooltip title="Cancel">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  cancelMoreActions();
                }}
              >
                <X size={15} />
              </IconButton>
            </Tooltip>
          </div>

          <div className="btn-actions">
            <Tooltip
              title={
                s.archivedAt !== null
                  ? `${s.title} is already archived`
                  : "Archive Session"
              }
            >
              <span>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    openModalarchiveSession(s.id);
                  }}
                  color="error"
                  disabled={s.archivedAt !== null}
                >
                  <Archive size={18} />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip
              title={
                s.archivedAt === null
                  ? "Archive this session first before restoring."
                  : "Unarchive"
              }
            >
              <span>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    restoreArchivedSession(s.id);
                  }}
                  color="error"
                  disabled={s.archivedAt === null}
                >
                  <ArchiveRestore size={18} />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>
      )}
  </div>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
