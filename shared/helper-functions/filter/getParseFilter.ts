import { filterSessionView } from './../../types/filterSessions';
import type { FilterSessions, FilterSessionView } from "../../types/filterSessions";
import type { Mood } from "../../types/Mood";
import type { SortSessions } from "../../types/SortSessions";
import { moods } from "../../types/Mood";
import { sortSessions } from "../../types/SortSessions";
import type { SessionStatus } from "../../types/SessionStatus";
import type { TechnologyCategories } from "../../types/TechnologyCategories";
import { technologyCategories } from "../../types/TechnologyCategories";
import { statuses } from "../../types/SessionStatus";

export type SessionFilterProps = {
  search?: string;
  mood?: string;
  status?: SessionStatus;
  sort?: string;
  page?: string;
  limit?: string;
  view?: string;
};

export function isMood(value?: string): value is Mood {
  return moods.includes(value as Mood);
}

export function isSort(value?: string): value is SortSessions {
  return sortSessions.includes(value as SortSessions);
}

export function isCategory(value: string): value is TechnologyCategories {
  return technologyCategories.includes(value as TechnologyCategories);
}

export function isStatus(value: string): value is SessionStatus {
  return statuses.includes(value as SessionStatus);
};

export function isView(value: string): value is FilterSessionView {
  return filterSessionView.includes(value as FilterSessionView);
}

export function parseSessionQuery({
  search,
  mood,
  sort,
  status,
  page,
  limit,
  view
}: SessionFilterProps): FilterSessions {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  return {
    search: search ?? "",
    mood: mood !== undefined && isMood(mood) ? mood : "all",
    sort: sort !== undefined && isSort(sort) ? sort : "createdAt-asc",
    status: status !== undefined && isStatus(status) ? status : "all",
    page: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    limit: Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5,
    view: view !== undefined && isView(view) ? view : "active"
  };
}
