import type { Session } from "../../../shared/types/sessions";

export function getSessionStatusClass(status: Session["status"]) {
  switch (status) {
    case "planned":
      return "status-planned";
    case "open":
      return "status-open";
    case "in-progress":
      return "status-in-progress";
    case "almost-done":
      return "status-almost-done";
    case "halfway":
      return "status-halfway";
    case "completed":
      return "status-completed";
    case "closed":
      return "status-closed";

    default: {
      return "status-default";
    }
  }
}
