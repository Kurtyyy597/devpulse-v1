export type PaginationMeta = {
  page: number;
  limit: number;
  totalSessions: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};