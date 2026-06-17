import { useEffect, useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Session } from "../../../../shared/types/sessions";
import { useSessions } from "../../hooks/queries/useSessions";
import { useArchiveSession } from "../../hooks/mutation/single-actions/useArchiveSession";
import { useSoftDeleteSession } from "../../hooks/mutation/single-actions/useSoftDeleteSession";
import FilterComponent from "../../components/filter/filter-sessions-component/FilterComponent";
import SessionComponent from "../../components/pages-component/session-component/SessionComponent";
import ConfirmationModalComponent from "../../components/confirmation-modal-component/ConfirmationModalComponent";
import PaginationComponent from "../../components/pagination-session-component/PaginationComponent";
import "./Sessions.css"
import { useDebounce } from "../../hooks/queries/useDebounce";
import { useRestoreArchiveSession } from "../../hooks/mutation/single-actions/useRestoreArchivedSession";
import { useSearchParams } from "react-router-dom";
import { getFiltersFromSearchParams } from "../../helper/sync-url/getFiltersFromSearchParams";
import { setFiltersToSearchParams } from "../../helper/sync-url/setFiltersToSearchParams";
import type { FilterSessions } from "../../../../shared/types/filterSessions";
import { useArchiveManySessions } from "../../hooks/mutation/bulk-actions/useArchiveManySessions";
import { useRestoreManyArchivedSessions } from "../../hooks/mutation/bulk-actions/useRestoreManyArchivedSessions";
import { useSoftDeleteManySessions } from "../../hooks/mutation/bulk-actions/useSoftDeleteManySessions";
import { useRestoreManyDeletedSessions } from "../../hooks/mutation/bulk-actions/useRestoreManyDeletedSessions";
import { useKeyboardShortcuts } from "../../hooks/keyboards/useKeyboardShortcuts";
import CommandPalleteComponent from "../../components/command-pallete-component/CommandPallete";
import { useOpenCommandPalleteShortcut } from "../../hooks/keyboards/useOpenCommandPallete";

export default function Sessions() {
  const navigate = useNavigate();

  const [archiveSessionId, setArchiveSessionId] = useState<Session["id"] | null>(null);
  const [softDeleteSessionId, setSoftDeleteSessionId] = useState<Session["id"] | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = getFiltersFromSearchParams(searchParams);

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const archiveSessionMutation = useArchiveSession();
  const softDeleteSessionMutation = useSoftDeleteSession();
  const restoreArchiveSessionMutation = useRestoreArchiveSession();

  const archiveManySessionsMutation = useArchiveManySessions();
  const restoreManyArchivedSessionsMutation = useRestoreManyArchivedSessions();
  const softDeleteManySessionsMutation = useSoftDeleteManySessions();
  const restoreManyDeletedSessionsMutation = useRestoreManyDeletedSessions();

  const [openCommandPallete, setOpenCommandPallete] = useState<boolean>(false);

  const closeCommandPallate = () => {
    setOpenCommandPallete(false);
  };

  const navigateToCreate = () => {
    navigate("/sessions/create");
  };

  const clearSelection = () => {
    console.log("Clear");
    setSelectedIds([]);
  };

  const openCommand = () => {
    setOpenCommandPallete(true);
  };

  useOpenCommandPalleteShortcut({
    openCommand: openCommand
  });

  const inputRef = useRef<HTMLInputElement>(null);

   const handleConfirmArchive = async () => {
    if (!selectedArchivedSession) {
      return;
    }

    try {
      await archiveSessionMutation.mutateAsync(selectedArchivedSession.id);

      toast.success(
        <div className="toast">
          <span>
            <strong>{selectedArchivedSession.title}</strong> archived
          </span>

          
        </div>,
      );

      handleCloseArchiveModal();
    } catch {
      toast.error("Failed to archive session");
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeletedSession) {
      return;
    }

    try {
      await softDeleteSessionMutation.mutateAsync(selectedDeletedSession.id);

      toast.success(
        <div className="toast">
          <span>
            <strong>{selectedDeletedSession.title}</strong> moved to bin
          </span>

          <Link to="/sessions/trash">View Bin</Link>
        </div>,
      );

      handleCloseDeleteModal();
    } catch {
      toast.error("Failed to delete session");
    }
  };

  const handleUndoManyArchivedSessions = async (undoIds: string[]) => {
    try {
      await restoreManyArchivedSessionsMutation.mutateAsync(undoIds)
      toast.success("Archive reverted")
    } catch {
      toast.error("Failed to undo archive");
    };
  };

  const handleUndoManyDeletedSessions = async (undoIds: string[]) => {
    try {
      await restoreManyDeletedSessionsMutation.mutateAsync(undoIds);
      toast.success("Deleted restored");
    } catch {
      toast.error("Failed to undo deleted");
    };
  };

  const handleReArchiveManySessions = async (undoIds: string[]) => {
    try {
      await archiveManySessionsMutation.mutateAsync(undoIds);
      toast.success("Restore reverted")
    } catch {
      toast.error("Failed to undo restore");
    }
  }

  const handleArchiveManySessions = async () => {
    if (selectedIds.length === 0) {
      return;
    };

    const undoIds = [...selectedIds]

    try {
      await archiveManySessionsMutation.mutateAsync(undoIds);
      setSelectedIds([]);

      toast.success(
        <div className="success">
          <span className="success-text"> {undoIds.length} sessions successfully archived </span>
          <button className="undo-archive" onClick={() => handleUndoManyArchivedSessions(undoIds)}>
            Undo
          </button>
        </div>
      )
    } catch {
      toast.error("Selected sessions failed to archive");
    };
  };

  const handleSoftDeleteManySessions = async () => {
    if (selectedIds.length === 0) {
      return;
    };

    const undoIds = [...selectedIds];

    try {
      await softDeleteManySessionsMutation.mutateAsync(undoIds);
      setSelectedIds([]);

      toast.success(
        <div className="success">
          <span className="success-text"> {undoIds.length} sessions successfully soft deleted </span>
          <button className="undo-deleted" onClick={() => handleUndoManyDeletedSessions(undoIds)}>
            Undo 
          </button>
        </div>
      )
    } catch {
      toast.error("Selected sessions failed to delete");
    };
  };

  const handleRestoreManyArchiveSessions = async () => {
    if (selectedIds.length === 0) {
      return;
    };

    const undoIds = [...selectedIds];

    try {
      await restoreManyArchivedSessionsMutation.mutateAsync(undoIds);
      setSelectedIds([]);
      toast.success(
        <div className="success">
          <span className="success-text"> {undoIds.length} sessions restored </span>
          <button className="btn-undo-restore" onClick={() => handleReArchiveManySessions(undoIds)}> Undo </button>
        </div>
      )
    } catch {
      toast.error("Failed to restore sessions");
    };
  }

  useKeyboardShortcuts({
    selectedIds,
    archiveMany: handleArchiveManySessions,
    restoreMany: handleRestoreManyArchiveSessions,
    softDeleteMany: handleSoftDeleteManySessions,
    navigateToCreate,
    focusSearch: () => inputRef.current?.focus(),
    clearSelection,
  });

  


  const openMoreActions = (id: Session["id"]) => {
    setSelectedSessionId(id);
  };

  const restoreArchivedSession = async (
  sessionId: Session["id"]
) => {
  console.log("RESTORE FUNCTION", sessionId);

  try {
    await restoreArchiveSessionMutation.mutateAsync(sessionId);

    toast.success("Session restored");
  } catch {
    toast.error("Failed to restore");
  }
};

  const handleCloseMoreAction = () => {
    setSelectedSessionId(null);
  };

 
  

  const debounceSearch = useDebounce(filters.search ?? "", 600);

  const updateFilters = (updates: Partial<FilterSessions>) => {
    setFiltersToSearchParams({
      ...filters,
      ...updates
    },
    setSearchParams
    )
  }
 
  const {
    data: sessions,
    isLoading,
    error,
  } = useSessions({
    ...filters,
    search: debounceSearch,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    };
  }, [error]);

  if (isLoading) {
    return <span className="loading">Loading...</span>;
  }

  if (!sessions) {
    return <span className="error">Sessions not found.</span>;
  }

  const selectedArchivedSession =
    sessions.data.find((session) => session.id === archiveSessionId) ?? null;

  const selectedDeletedSession =
    sessions.data.find((session) => session.id === softDeleteSessionId) ?? null;

  const isArchiveModalOpen = archiveSessionId !== null;

  const isDeleteModalOpen = softDeleteSessionId !== null;

  const handleNavigateToSessionDetails = (sessionId: Session["id"]) => {
    navigate(`/sessions/${sessionId}`);
  };

  const handleEditSession = (sessionId: Session["id"]) => {
    navigate(`/sessions/update/${sessionId}`);
  };

  const handleOpenArchiveModal = (sessionId: Session["id"]) => {
    setArchiveSessionId(sessionId);
  };

  const handleOpenDeleteModal = (sessionId: Session["id"]) => {
    setSoftDeleteSessionId(sessionId);
  };

  
    const handleChangePage = (page: number) => {
      if (page < 1 || page > sessions.pagination.totalPages) {
        return;
      }

      updateFilters({
        page 
      });
    };

  const handleCloseArchiveModal = () => {
    setArchiveSessionId(null);
  };

  const handleCloseDeleteModal = () => {
    setSoftDeleteSessionId(null);
  };

  const hasActiveFilters =
  filters.search.trim() !== "" ||
  filters.status !== "all" ||
  filters.mood !== "all" ||
  filters.view !== "active";

  const hasNoSessions = sessions.totalUnfilteredSessions === 0;

  const hasNoMatches = hasActiveFilters && sessions.data.length === 0 && sessions.totalUnfilteredSessions > 0;

 

  const toggleSessionSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((ids) => ids !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === sessions.data.length) {
      setSelectedIds([]);
      return
    };

    setSelectedIds(sessions.data.map((s) => s.id));
  };

  const selectedSessions = sessions.data.filter((s) => selectedIds.includes(s.id));

  const canArchive = selectedSessions.every(
    (s) => s.archivedAt === null);

  const canRestoreArchived = selectedSessions.every(
    (s) => s.archivedAt !== null);

  const canSoftDelete = selectedSessions.every(
    (s) => s.deletedAt === null);



  return (
    <div className="session-page-wrapper">
      <div className="session-page-top">
        <span className="pallete">
        Press <kbd>Shift</kbd> + <kbd>K</kbd> to open command palette
        </span>
      </div>
      
      <FilterComponent filters={filters} updateFilters={updateFilters} searchInputRef={inputRef}/>

      
      <CommandPalleteComponent
      open={openCommandPallete}
      onClose={closeCommandPallate}/>

      {hasNoSessions && (
        <div className="empty-sessions">
          <span className="empty-text"> No Sessions yet. Start by adding one. </span>
          <Link to="/sessions"> Create session </Link>
        </div>
      )}

      {hasNoMatches && (
        <div className="error-filter">
          No matches. Try another filters.
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="bulk-actions-container">
          <span className="session-length"> {selectedIds.length} <strong> sessions </strong>  selected </span>

          <div className="btn-actions">
            <button 
            className="btn-archive" 
            onClick={handleArchiveManySessions}
            disabled={!canArchive}>
              Archive selected
            </button>
            <button
            className="btn-soft-delete"
            disabled={!canSoftDelete}
            onClick={handleSoftDeleteManySessions}>
              Delete selected
            </button>
            <button
            className="btn-restore-archive"
            disabled={!canRestoreArchived}
            onClick={handleRestoreManyArchiveSessions}>
              Restore selected
            </button>
          </div>
        </div>
      )}

      {!hasNoSessions && !hasNoMatches && (
      <>
        <SessionComponent
          sessions={sessions.data}
          navigateToSessionDetails={handleNavigateToSessionDetails}
          editSession={handleEditSession}
          openModalarchiveSession={handleOpenArchiveModal}
          openModalsoftDeleteSession={handleOpenDeleteModal}
          restoreArchivedSession={restoreArchivedSession}
          openMoreActions={openMoreActions}
          cancelMoreActions={handleCloseMoreAction}
          activeSessionId={selectedSessionId}
          selectedSessionIds={selectedIds}
          toggleSessionSelection={toggleSessionSelection}
          toggleSelectAll={toggleSelectAll}
          />

        <PaginationComponent
          pagination={sessions.pagination}
          onPageChange={handleChangePage}
        />
      </>
    )}

    <ConfirmationModalComponent
      session={selectedArchivedSession}
      open={isArchiveModalOpen}
      onClose={handleCloseArchiveModal}
      dialogTitleText="Archive Session"
      dialogContentText="This session will be moved to the archive page."
      confirmButtonText="Archive"
      confirmButtonColor="warning"
      onConfirm={handleConfirmArchive}
    />

    <ConfirmationModalComponent
      session={selectedDeletedSession}
      open={isDeleteModalOpen}
      onClose={handleCloseDeleteModal}
      dialogTitleText="Delete Session"
      dialogContentText="This session will be moved to the bin history."
      confirmButtonText="Delete"
      confirmButtonColor="error"
      onConfirm={handleConfirmDelete}
    />
    </div>
  );
}
