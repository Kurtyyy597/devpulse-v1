import type { Session } from "../../../../../shared/types/sessions";
import LabelContainerComponent from "../dashboard-component/label-container-component/LabelContainerComponent";
import {
  IconButton,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { ExternalLink, Trash2, Undo2 } from "lucide-react";
import { muiThemeStyles } from "../../../../../shared/const/muiThemeStyles";
import "./TrashComponent.css";

export type TrashComponentProps = {
  sessions: Session[];

  viewSession: (sessionId: Session["id"]) => void;
  restoreSession: (sessionId: Session["id"]) => void;
  permanentDelete: (sessionId: Session["id"]) => void;

  selectedSessionIds: string[];
  toggleSelectSession: (sessionId: string) => void;
  toggleSelectAll: () => void;
};

export default function TrashComponent({
  sessions,
  viewSession,
  restoreSession,
  permanentDelete,

  selectedSessionIds,
  toggleSelectSession,
  toggleSelectAll,
}: TrashComponentProps) {
  const softDeletedSessions = sessions.filter(
    (s) => s.deletedAt !== null
  );

  return (
    <div className="trash-wrapper">
      <h1 className="trash-title">Bin History</h1>

      <section className="trash-select-all">
        <Checkbox
          checked={
            softDeletedSessions.length > 0 &&
            selectedSessionIds.length ===
              softDeletedSessions.length
          }
          indeterminate={
            selectedSessionIds.length > 0 &&
            selectedSessionIds.length <
              softDeletedSessions.length
          }
          onChange={toggleSelectAll}
        />

        <span className="select-all-text">
          Select all
        </span>
      </section>

      <section className="trash-container">
        {softDeletedSessions.map((s, index) => (
          <div key={s.id} className="trash-card">
            <div className="trash-card-header">
              <Checkbox
                checked={selectedSessionIds.includes(
                  s.id
                )}
                onChange={() =>
                  toggleSelectSession(s.id)
                }
              />
            </div>

            <LabelContainerComponent
              label={`${index + 1}. Title`}
              value={s.title}
            />

            <LabelContainerComponent
              label="Date deleted"
              value={
                s.deletedAt
                  ? new Date(
                      s.deletedAt
                    ).toLocaleDateString()
                  : "Unknown Date"
              }
            />

            <div className="trash-btn-container">
              {selectedSessionIds.length === 0 && (
                <>
                  <Tooltip title="View details">
                    <span>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          viewSession(s.id);
                        }}
                        color="inherit"
                        sx={muiThemeStyles.heading}
                      >
                        <ExternalLink size={18} />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="Restore">
                    <span>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreSession(s.id);
                        }}
                        color="inherit"
                        sx={muiThemeStyles.heading}
                      >
                        <Undo2 size={18} />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Tooltip title="Permanent delete">
                    <span>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          permanentDelete(s.id);
                        }}
                        color="inherit"
                        sx={muiThemeStyles.heading}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}