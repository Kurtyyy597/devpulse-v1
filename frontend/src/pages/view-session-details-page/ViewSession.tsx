import { useEffect } from "react";
import ViewSessionDetailsComponent from "../../components/view-session-details-component/ViewSessionDetailsComponent";
import { useSession } from "../../hooks/queries/useSession";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Session } from "../../../../shared/types/sessions";
import { useState } from "react";
import ConfirmationModalComponent from "../../components/confirmation-modal-component/ConfirmationModalComponent";
import { useArchiveSession } from "../../hooks/mutation/single-actions/useArchiveSession";
import { Link } from "react-router-dom";
import { useSoftDeleteSession } from "../../hooks/mutation/single-actions/useSoftDeleteSession";

function ViewSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: session, isLoading, error } = useSession(id ?? "");

  const [archivedSessionId, setArchivedSessionId] = useState<string | null>(
    null,
  );
  const [softDeletedSessionId, setSoftDeletedSessionId] = useState<
    string | null
  >(null);

  const softDeleteSession = useSoftDeleteSession();

  const archiveSession = useArchiveSession();

  useEffect(() => {
    if (!id) {
      toast.error("Session ID not found");
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && !session) {
      toast.error("Session not found");
    }
  }, [isLoading, session]);

  if (!id) {
    return <span className="id-error"> Invalid Session ID </span>;
  }

  if (isLoading) {
    return <span className="loading"> Loading... </span>;
  }

  if (!session?.data) {
    return <span>Session not found.</span>;
  }

  const openArchiveModal = (id: Session["id"]) => {
    setArchivedSessionId(id);
  };

  const openSoftDeletedModal = (id: Session["id"]) => {
    setSoftDeletedSessionId(id);
  };

  const selectedSession = session.data;

  const handleCloseArchiveModal = () => {
    setArchivedSessionId(null);
  };

  const handleCloseDeleteModal = () => {
    setSoftDeletedSessionId(null);
  };

  const handleConfirmArchive = async () => {
    if (!archivedSessionId) {
      return;
    }

    try {
      await archiveSession.mutateAsync(archivedSessionId);

      toast.success(
        <div className="toast">
          <span>
            <strong>{selectedSession.title}</strong> archived
          </span>
        </div>,
      );

      handleCloseArchiveModal();
      navigate(`/sessions`);
    } catch {
      toast.error("Go to ViewSession.tsx to check");
    }
  };

  const handleConfirmDelete = async () => {
    if (!softDeletedSessionId) {
      return;
    }

    try {
      await softDeleteSession.mutateAsync(softDeletedSessionId);

      toast.success(
        <div className="toast">
          <span>
            <strong>{selectedSession.title}</strong> moved to bin
          </span>

          <Link to="/sessions/softDeleted">View Bin</Link>
        </div>,
      );

      handleCloseDeleteModal();
      navigate(`/sessions`);
    } catch {
      toast.error("Failed to delete session");
    }
  };

  return (
    <div className="view-session-wrapper">
      <ViewSessionDetailsComponent
        session={session.data}
        onArchive={openArchiveModal}
        onDelete={openSoftDeletedModal}
      />

      <ConfirmationModalComponent
        session={selectedSession}
        open={archivedSessionId !== null}
        onClose={handleCloseArchiveModal}
        onConfirm={handleConfirmArchive}
        dialogTitleText="Archive Session"
        dialogContentText="This session will be moved to the archive page."
        confirmButtonText="Archive"
        confirmButtonColor="warning"
        isLoading={archiveSession.isPending}
      />

      <ConfirmationModalComponent
        session={selectedSession}
        open={softDeletedSessionId !== null}
        onClose={handleCloseDeleteModal}
        dialogTitleText="Delete Session"
        dialogContentText="This session will be moved to the bin history."
        confirmButtonText="Delete"
        confirmButtonColor="error"
        isLoading={softDeleteSession.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ViewSession;
