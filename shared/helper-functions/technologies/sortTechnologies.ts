import type { Skills} from "../../types/sessions";
import { normalizeText } from "../normalizedText/normalizeText";
export function sortTechnologiesByTs(
  technology: Skills[],
) {

  return [...technology].sort((a, b) => {
    return normalizeText(a.name).localeCompare(normalizeText(b.name));
  });
}