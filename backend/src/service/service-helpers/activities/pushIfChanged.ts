import { addActivity } from "./addActivities";

import type { SessionActivity } from "../../../../../shared/types/SessionActivity";
import type { SessionField } from "../../../../../shared/types/SessionFields";
import { normalizeText } from "../../../../../shared/helper-functions/normalizedText/normalizeText";

export function pushIfChanged(
  field: SessionField,
  current: string,
  next: string,
  sessionActivities: SessionActivity[],
) {
  if (normalizeText(current) !== normalizeText(next)) {
    const newActivity = addActivity(field, current ?? "", next ?? "");

    sessionActivities.push(newActivity);
  }
}
