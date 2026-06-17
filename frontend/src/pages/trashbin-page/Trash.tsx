import TrashComponent from "../../components/pages-component/trash-bin-component/TrashComponent";
import { useSoftDeletedSessions } from "../../hooks/queries/useSoftDeletedSessions";
import { useRestoreSoftDeletedSession } from "../../hooks/mutation/single-actions/useRestoreSoftDeletedSession";
import { usePermanentDeleteSession } from "../../hooks/mutation/single-actions/usePermanentDeleteSession";
import { toast } from "react-toastify";
import { useState} from "react";
import type { Session } from "../../../../shared/types/sessions";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModalComponent from "../../components/confirmation-modal-component/ConfirmationModalComponent";
import "./Trash.css"
import { useRestoreManyDeletedSessions } from "../../hooks/mutation/bulk-actions/useRestoreManyDeletedSessions";
import { usePermanentDeleteManySessions } from "../../hooks/mutation/bulk-actions/usePermanentDeleteManySessions";
import { IconButton, Tooltip, Button } from "@mui/material";
import { Trash2, Undo2 } from "lucide-react";
import { muiThemeStyles } from "../../../../shared/const/muiThemeStyles";


function Trash() {
  const navigate = useNavigate();

  const {
    data: deletedSessions,
    isLoading
  } = useSoftDeletedSessions();

  const [permanentDeletedId, setPermanentDeletedId] = useState<Session["id"] | null>(null);
  const [restoreSessionId, setRestoreSessionId] = useState<Session["id"] | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const restoreManyDeletedMutation = useRestoreManyDeletedSessions();
  const permanentDeleteManySessionsMutation = usePermanentDeleteManySessions();

  
  

  const restoreSoftDeleteMutation = useRestoreSoftDeletedSession();
  const permanentDeleteMutation = usePermanentDeleteSession();

  const [openModalDeleteConfirmation, setOpenModalDeleteConfirmation] = useState<boolean>(false);
  

  if (isLoading) {
    return <span className="loading"> Loading deleted sessions </span>
  };

 if (!deletedSessions || deletedSessions.data.length === 0) {
   return (
    <div className="data-error">
      <span className="error-text"> No deleted sessions yet.</span>
      <Link to="/sessions"> Go to sessions </Link>
    </div>
   )
 };
 
  const viewSession = (id: Session["id"]) => {
    navigate(`/sessions/${id}`);
  };

  const handleRestoreOpenModal = (id: Session["id"]) => {
    setRestoreSessionId(id);
  };

  const closeRestoreModal = () => {
    setRestoreSessionId(null);
  };

  const handleDeleteOpenModal = (id: Session["id"]) => {
    setPermanentDeletedId(id);
  };

  const closeDeleteModal = () => {
    setPermanentDeletedId(null);
  };

  const selectedRestoreSession = deletedSessions.data.find((s) => s.id === restoreSessionId) ?? null;
  const selectedDeletedSession = deletedSessions.data.find((s) => s.id === permanentDeletedId) ?? null;

  const handleRestoreSession = async () => {
    if (!selectedRestoreSession) return;

    try {
      await restoreSoftDeleteMutation.mutateAsync(selectedRestoreSession.id);

      closeRestoreModal();

      toast.success(`${selectedRestoreSession.title} restored`);
    } catch {
      toast.error("Session failed to restore")
    }
  };

  const handlePermanentDelete = async () => {
    if (!selectedDeletedSession) return;

    try {
      await permanentDeleteMutation.mutateAsync(selectedDeletedSession.id);

      closeDeleteModal();

      toast.success(`${selectedDeletedSession.title} permanently deleted`);
    } catch {
      toast.error("Session failed to permanent delete");
    };
  };

  const toggleSelectSession = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((ids) => ids !== id) : [...prev, id]
    );
  };

  const openModalDelete = () => {
    setOpenModalDeleteConfirmation(true);
  };

  const cancelModalDelete = () => {
    setOpenModalDeleteConfirmation(false);
    setSelectedIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === deletedSessions.data.length) {
      setSelectedIds([]);
      return
    };

    setSelectedIds(deletedSessions.data.map((s) => s.id));
  };

  const handleRestoreManySessionsDeleted = async () => {
    if (selectedIds.length === 0) {
      toast.error("No selected sessions yet");
      return;
    };

    try {
      await restoreManyDeletedMutation.mutateAsync(selectedIds);
      toast.success("Selected sessions successfully restored");
      setSelectedIds([]);
      setOpenModalDeleteConfirmation(false);
    } catch {
      toast.error("Failed to restored sessions");
    };
  };

  const handlePermanentDeleteManySessions = async () => {
    if (selectedIds.length === 0) {
      toast.error("No selected sessions yet");
      return;
    };

    try {
      await permanentDeleteManySessionsMutation.mutateAsync(selectedIds);
      toast.success("Selected sessions permanently deleted");
      setSelectedIds([]);
      setOpenModalDeleteConfirmation(false);
    } catch {
      toast.error("Failed to permanent delete sessions");
    };
  };

  

  return (
    <div className="trash-page-wrapper">


      {selectedIds.length > 0 && (
        <div className="actions-container">
          <span className="trash-sessions-length"> {selectedIds.length} <strong> sessions </strong> selected  </span>
          
          <div className="btn-container">
            <Tooltip title="Restore selected sessions">
              <span>
              <IconButton
                onClick={(e) => {
                e.stopPropagation();
                handleRestoreManySessionsDeleted()
                }}
                color="default"
                disabled={selectedIds.length === 0}
                sx={muiThemeStyles.heading}>
                <Undo2 size={18} />
              </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Permanent delete selected sessions">
              <span>
              <IconButton
                onClick={(e) => {
                e.stopPropagation();
                openModalDelete();
                }}
                color="error"
                disabled={selectedIds.length === 0}
                sx={muiThemeStyles.heading}>
                <Trash2 size={18} />
              </IconButton>
              </span>
            </Tooltip>
          </div>
          
          {openModalDeleteConfirmation && (
            <div className="modal-container">
              <div className="modal-card">
                <div className="modal-top">
                  <h2 className="modal-top-title"> Confirmation </h2>
                  <span className="modal-top-title-sub"> Delete {selectedIds.length} sessions? </span>

                  <div className="modal-actions">
                    <Tooltip title="Cancel delete">
                      <span>
                      <Button
                        onClick={(e) => {
                        e.stopPropagation();
                        cancelModalDelete();
                        }}
                        color="error"
                        disabled={selectedIds.length === 0}
                        sx={muiThemeStyles.heading}>
                        Cancel
                      </Button>
                      </span>
                    </Tooltip>
                    <Tooltip title="Permanent delete selected sessions">
                      <span>
                      <Button
                        onClick={(e) => {
                        e.stopPropagation();
                        handlePermanentDeleteManySessions();
                        }}
                        color="error"
                        disabled={selectedIds.length === 0}
                        sx={muiThemeStyles.heading}>
                        Confirm
                      </Button>
                      </span>
                    </Tooltip>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      )}

   



      <TrashComponent
        sessions={deletedSessions.data}
        viewSession={viewSession}
        restoreSession={handleRestoreOpenModal}
        permanentDelete={handleDeleteOpenModal}
        selectedSessionIds={selectedIds}
        toggleSelectAll={toggleSelectAll}
        toggleSelectSession={toggleSelectSession}
      />

      <ConfirmationModalComponent
        open={restoreSessionId !== null}
        session={selectedRestoreSession}
        onClose={closeRestoreModal}
        onConfirm={handleRestoreSession}
        dialogTitleText={`Restore ${selectedRestoreSession?.title}`}
        dialogContentText="Session will be back in sessions page"
        confirmButtonText="Restore"
        confirmButtonColor="error"
      />

      <ConfirmationModalComponent
        open={permanentDeletedId !== null}
        session={selectedDeletedSession}
        onClose={closeDeleteModal}
        onConfirm={handlePermanentDelete}
        dialogTitleText={`Permanently delete ${selectedDeletedSession?.title}`}
        dialogContentText="This session will get permanently deleted"
        confirmButtonText="Confirm"
        confirmButtonColor="error"
      />
    </div>
  );







};
export default Trash;