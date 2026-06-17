import type { Session } from "../../../shared/types/sessions";

export function getSessionMoodClass(mood: Session["mood"]) {
  switch (mood) {
    case "tired":
      return "mood-tired";
    case "distracted":
      return "mood-distracted";
    case "focused":
      return "mood-focused";
    case "motivated":
      return "mood-motivated";

    default: {
      return "mood-default";
    }
  }
}
