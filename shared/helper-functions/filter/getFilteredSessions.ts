import type { FilterSessions } from "../../types/filterSessions";
import type { Session } from "../../types/sessions";
import { normalizeText } from "../normalizedText/normalizeText";

export function getFilterSessions(
  filters: FilterSessions,
  sessions: Session[],
) {
  const searchInput = normalizeText(filters.search ?? "");

  const filtered = sessions.filter((s) => {
    const searchableFields = [
      normalizeText(s.title),
      normalizeText(s.description ?? ""),
      normalizeText((s.skills ?? []).join(", ")),
      normalizeText(s.mood),
    ];

    if (
      searchInput &&
      !searchableFields.some((field) => field.includes(searchInput))
    )
      return false;

    if (filters.mood !== "all" && s.mood !== filters.mood) return false;

    if (filters.status !== "all" && s.status !== filters.status) return false;

    if (
      filters.view === "active" &&
      (s.deletedAt !== null || s.archivedAt !== null)
    )
      return false;

    if (
      filters.view === "archived" &&
      (s.archivedAt === null || s.deletedAt !== null)
    )
      return false;
    
      return true;
  });

  console.log("VIEW:", filters.view);
  console.log("FILTERED:", filtered);

  return filtered;
}