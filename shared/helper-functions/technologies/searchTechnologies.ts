import type { Skills } from "../../types/sessions";
import { normalizeText } from "../normalizedText/normalizeText";

export function searchTechnologies(
  searchQuery: string,
  technologies: Skills[],
) {
  const normalizedQuery = normalizeText(searchQuery);

  if (!normalizedQuery) {
    return technologies;
  }

  return technologies.filter((t) => {
    const normalizeValues = [
      normalizeText(t.name),
      normalizeText(t.skillsId),
      normalizeText(t.category),
    ];

    return normalizeValues.some((val) => val.includes(normalizedQuery));
  });
}
