import { getPaginationPages } from "../../helper/pagination";
import type { PaginationMeta } from "../../../../shared/types/paginationMeta";
import "./PaginationComponent.css";
export type PaginationComponentProps = {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({
  pagination,
  onPageChange,
}: PaginationComponentProps) {
  const { page, totalPages, hasNext, hasPrevious } = pagination;

  const pages = getPaginationPages(page, totalPages);

  return (
    <div className="pagination-wrapper">
      <button
        className="btn-prev"
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      {pages.map((item) => {
        if (item === "left-ellipsis" || item === "right-ellipsis") {
          return (
            <span className="pagination-ellipsis" key={item}>
              ...
            </span>
          );
        }

        return (
          <button
            key={item}
            type="button"
            className={`pagination-page ${item === page ? "active" : ""}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        );
      })}

      <button
        className="btn-next"
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
      <div className="length">
        <span className="length-text">
          {" "}
          Page <strong> {page} </strong> out of{" "}
          <strong> {totalPages} </strong>{" "}
        </span>
      </div>
    </div>
  );
}
