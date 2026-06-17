import type { PaginationMeta } from "../../types/paginationMeta";

export function paginate<T>(
  items: T[],
  page: number,
  limit: number 
) {

  const total = items.length > 0 ? items.length : 0
  
  const totalPages = Math.max(1,(Math.ceil(total / limit))); 

  const startIndex = (page - 1) * limit;

  const endIndex = startIndex + limit;

  const data = items.slice(startIndex, endIndex);

  const pagination: PaginationMeta = {
    totalSessions: total,
    totalPages,
    limit,
    page,

    hasNext: page < totalPages,
    hasPrevious: page > 1
    
  };

  return {
    data,
    pagination
  };
  
}