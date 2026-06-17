import type { SortSessions } from "../../../shared/types/SortSessions";

export const sortName: Record<SortSessions, string> = {
  "title-asc": "🔤 Title (A → Z)",
  "title-desc": "🔠 Title (Z → A)",

  "activityPercentage-asc": "📉 Least Progress",
  "activityPercentage-desc": "📈 Most Progress",

  "createdAt-asc": "📜 Oldest Created",
  "createdAt-desc": "🆕 Newest Created",

  "updatedAt-asc": "📂 Least Recently Updated",
  "updatedAt-desc": "🔄 Recently Updated",

  "archivedAt-asc": "🗄️ Archived Earliest",
  "archivedAt-desc": "📦 Recently Archived",
};
