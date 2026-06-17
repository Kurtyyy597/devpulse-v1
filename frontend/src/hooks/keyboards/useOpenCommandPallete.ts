import { useEffect } from "react"
import { normalizeText } from "../../../../shared/helper-functions/normalizedText/normalizeText";

export type OpenCommandPalleteProps = {
  openCommand: () => void;
};

export function useOpenCommandPalleteShortcut({openCommand}: OpenCommandPalleteProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = normalizeText(e.key);

      if (e.shiftKey && key === "k") {
        e.preventDefault()
        openCommand();
        return;
      };
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [openCommand]);
}