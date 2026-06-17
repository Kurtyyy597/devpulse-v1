import type { Skills } from "../../types/sessions";
import { normalizeText } from "../normalizedText/normalizeText";

export function getTechnologiesByNames(
  technologies: Skills[],
  technologiesIds: string[],
) {
  const normalizedIds = technologiesIds.map((id) => normalizeText(id));

  return technologies.filter((technology) =>
    normalizedIds.includes(normalizeText(technology.name)),
  );
}
