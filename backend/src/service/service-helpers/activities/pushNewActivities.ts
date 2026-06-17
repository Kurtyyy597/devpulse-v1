import type { Session } from "../../../../../shared/types/sessions";
import type { UpdateSessionForm } from "../../../../../shared/types/forms/UpdateSessionForm";
import { pushIfChanged } from "./pushIfChanged";

export function pushNewActivities(current: Session, next: UpdateSessionForm) {
  const activities = [...(current.activities ?? [])];

  if (next.title !== undefined) {
    pushIfChanged("title", current.title ?? "", next.title ?? "", activities);
  }

  if (next.description !== undefined) {
    pushIfChanged(
      "description",
      current.description ?? "",
      next.description ?? "",
      activities,
    );
  }

  if (next.dueDate !== undefined) {
    pushIfChanged(
      "dueDate",
      String(current.dueDate ?? ""),
      String(next.dueDate ?? ""),
      activities,
    );
  }

  if (next.duration !== undefined) {
    pushIfChanged(
      "duration",
      String(current.duration ?? ""),
      String(next.duration ?? ""),
      activities,
    );
  }

  if (next.mood !== undefined) {
    pushIfChanged("mood", current.mood, next.mood, activities);
  }

  if (next.status !== undefined) {
    pushIfChanged(
      "status",
      current.status ?? "",
      next.status ?? "",
      activities,
    );
  }

  if (next.skills !== undefined) {
    const currentSkills = (current.skills ?? []).sort().join(", ");
    const nextSkills = (next.skills ?? []).sort().join(", ");

    pushIfChanged("skills", currentSkills, nextSkills, activities ?? []);
  }

  return activities;
}
