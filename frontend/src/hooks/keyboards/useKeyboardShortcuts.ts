import { useEffect } from "react";
import { normalizeText } from "../../../../shared/helper-functions/normalizedText/normalizeText";

type UserKeyboardShortcutProps = {
  selectedIds: string[];
  archiveMany: () => void;
  restoreMany: () => void;
  softDeleteMany: () => void;
  navigateToCreate: () => void;
  focusSearch: () => void
  clearSelection: () => void
};

export function useKeyboardShortcuts({
  selectedIds,
  archiveMany,
  restoreMany,
  softDeleteMany,
  navigateToCreate,
  focusSearch,
  clearSelection
}: UserKeyboardShortcutProps) {
  useEffect(() => {

 

  const handleKeydown = (e: KeyboardEvent) => {
    
    const key = normalizeText(e.key);


    const target = e.target as HTMLElement;

    const isTyping =
    target.tagName === "TEXTAREA" ||
    target.isContentEditable ||
    (
    target instanceof HTMLInputElement &&
    target.type === "text"
    );

    if (e.shiftKey && key === "n") {
     
      e.preventDefault();
      navigateToCreate();
      return
    };

    if (e.shiftKey && key === "f") {
      e.preventDefault();
      focusSearch();
      return
    };

    if (isTyping) {
      return;
    }

    if (key === "delete" && selectedIds.length > 0) {
      console.log("Delete fired");
      softDeleteMany();
      e.preventDefault()
      return
    };

    if (e.shiftKey && key === "a") {
     
      e.preventDefault()
      archiveMany();
      return
    };

    if (e.shiftKey && key === "r") {
     restoreMany();
      e.preventDefault();
      return 
    };

    if (key === "escape") {
  console.log("ESCAPE");

  setTimeout(() => {
    clearSelection();
  }, 0);

  return;
}
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [
    selectedIds,
    archiveMany,
    restoreMany,
    softDeleteMany,
    navigateToCreate,
    focusSearch,
    clearSelection
  ]);
};