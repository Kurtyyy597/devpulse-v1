import { filterSessionView, type FilterSessions } from "../../../../../shared/types/filterSessions";
import FilterGroupComponent from "../filter-group-component/FilterGroupComponent";

import { statuses } from "../../../../../shared/types/SessionStatus";
import { moods } from "../../../../../shared/types/Mood";

import {
  sortSessions,
  type SortSessions,
} from "../../../../../shared/types/SortSessions";
import "./FilterComponent.css";
import { sortName } from "../../../helper/getSortName";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export type FilterComponentProps = {
  filters: FilterSessions;
  updateFilters: (update: Partial<FilterSessions>) => void;

  searchInputRef?: React.RefObject<HTMLInputElement | null>;
};

export default function FilterComponent({
  filters,
  updateFilters,

  searchInputRef
}: FilterComponentProps) {

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    
    updateFilters({
      [name]: value,
      page: 1
    } as Partial<FilterSessions>)
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({
    sort: e.target.value as SortSessions,
    page: 1,
    });
  };

  const activeFilters = [
    filters.search.trim() !== "" && `Search: ${filters.search}`,

    filters.status !== "all" && `Status: ${filters.status}`,

    filters.mood !== "all" && `Mood: ${filters.mood}`,

    filters.sort !== "createdAt-asc" && `Sort: ${sortName[filters.sort]}`,
  ].filter(Boolean) as string[];

  const resetFilters = () => {
    updateFilters({
      search: "",
      status: "all",
      mood:"all",
      page: 1,
      limit: 5,
      view: "active",
      sort: "createdAt-asc"
    })
  };

  return (
    <div className="filter-component-wrapper">
      {/* Header */}
      <section className="filter-header">
        <div className="filter-header-title">
          <h1 className="filter-title">Sessions</h1>

          <span className="filter-title-sub">
            Search, filter, and manage your learning sessions
          </span>
        </div>

        <div className="link-to-create">
          <Link to="/sessions/create" className="btn-create">
            <Plus size={20} />
            <span>Create</span>
          </Link>
        </div>
      </section>

      {/* Search */}
      <section className="filter-search-container">
        <FilterGroupComponent label="Search">
          <input
            ref={searchInputRef}
            className="input"
            name="search"
            placeholder="Search sessions..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </FilterGroupComponent>
      </section>

      {/* Filters */}
      <section className="filter-container">
        <div className="filter-card">
          <FilterGroupComponent label="Status">
            <select
              className="select"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all"> All </option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </FilterGroupComponent>

          <FilterGroupComponent label="Mood">
            <select
              className="select"
              name="mood"
              value={filters.mood}
              onChange={handleFilterChange}
            >
              <option value="all"> All </option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </FilterGroupComponent>

          <FilterGroupComponent label="View">
            <select
              className="select"
              name="view"
              value={filters.view}
              onChange={handleFilterChange}
            >
              {filterSessionView.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </FilterGroupComponent>

          <FilterGroupComponent label="Sort">
            <select
              className="select"
              name="sort"
              value={filters.sort}
              onChange={handleSortChange}
            >
              {sortSessions.map((sort) => (
                <option key={sort} value={sort}>
                  {sortName[sort]}
                </option>
              ))}
            </select>
          </FilterGroupComponent>
        </div>
      </section>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <section className="active-filters-container">
          <div className="active-filters-header">
            <h2 className="active-filter-text">Active Filters</h2>

            <button className="btn-reset" onClick={resetFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-chip-container">
            {activeFilters.map((filter) => (
              <div key={filter} className="filter-chip">
                {filter}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
