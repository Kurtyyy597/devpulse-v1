import type { Skills} from "../../types/sessions";
import { normalizeText } from "../normalizedText/normalizeText";

export function getTechnologyById(
  technology: Skills[],
  id: string
) {
  return technology.find((t) => normalizeText(t.name) === normalizeText(id));
};