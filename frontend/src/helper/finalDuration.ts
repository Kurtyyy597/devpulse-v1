import type { Session } from "../../../shared/types/sessions";

export function finalDuration(
  duration: Session["duration"]
) {
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;

  if (hours === 0) {
    return `${mins} mins`
  };

  if (mins === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} `
  };

  return `${hours}h and ${mins}m`
}