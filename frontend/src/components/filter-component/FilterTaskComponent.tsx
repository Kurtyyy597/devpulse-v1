import type { FilterTasks } from "../../../../shared/types/tasks/FilterTasks";
import type { SortTask } from "../../../../shared/types/tasks/SortTasks";
import { sortTasks } from "../../../../shared/types/tasks/SortTasks";
import {
  X,
  RotateCcw
} from "lucide-react";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Chip,
  IconButton
} from "@mui/material";

import { taskStatuses, taskPriorities } from "../../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";

export type FilterTaskComponentProps = {
  filters: FilterTasks;
  setFilters: React.Dispatch<React.SetStateAction<FilterTasks>>;
};

export default function FilterTaskComponent({
  filters,
  setFilters,
}: FilterTaskComponentProps) {

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setFilters((prev) => ({
      ...prev,
      [target.name]:
      target.type === "checkbox" ?
      target.checked : target.value
    }));
  };

  

  const getSortName: Record<SortTask, string> = {
    "title-asc": `Title ⬆️`,
    "title-desc": `Title ⬇️`,
    "createdAt-asc": `Newest ⬆️`,
    "createdAt-desc": `Oldest ⬇️`,
    "updatedAt-asc": `Updated ⬆️`,
    "updatedAt-desc": `Updated ⬇️`,
  };

  

  const resetFilter = () => {
    setFilters({
      search: "",
      statusFilter: "all",
      priorityFilter: "all",
      sort: "createdAt-asc",
      completed: undefined
    });
  };

  const resetSearch = () => {
    if (!filters.search.trim()) return;

    setFilters((prev) => ({
      ...prev,
      search: ""
    }));
  };



  type ActiveFilter = {
    label: string;
    value: string | boolean
  };

  const activeFilter: ActiveFilter[] = [
    filters.search.trim() !== "" && {
      label: `Search: ${filters.search}`,
      value: String(filters.search)
    },

    filters.priorityFilter !== "all" && {
      label: `Priority: ${filters.priorityFilter}`,
      value: filters.priorityFilter
    },

    filters.statusFilter !== "all" && {
      label: `Status: ${filters.statusFilter}`,
      value: filters.priorityFilter
    },

    filters.completed !== undefined && {
      label: `Completed: ${filters.completed}`,
      value: Boolean(filters.completed)
    },

    filters.sort !== "title-asc" && {
      label: `Sort: ${getSortName[filters.sort as SortTask]}`,
      value: filters.sort as SortTask
    },
  ].filter(Boolean) as ActiveFilter[];

  return (
    <div className="filter-wrapper">
      <h2 className="filter-title">Filter and manage your tasks</h2>

      <section className="filter-container">
        <section className="active-filters">
          {activeFilter.map((filter) => (
            <Chip
              key={String(filter.value)}
              label={filter.label}
              size="small"
              variant="outlined"
              onDelete={() => {
                console.log("remove filter");
              }}
              sx={{
                borderRadius: "999px",
                fontWeight: 600,
                bgcolor: "#f8fafc",

                "& .MuiChip-deleteIcon": {
                  color: "#64748b",
                },

                "&:hover": {
                  bgcolor: "#eef2ff",
                },
              }}
            />
          ))}

          <IconButton
            onClick={resetFilter}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: 2,
              transition: "0.2s ease",

              "&:hover": {
                backgroundColor: "#f8fafc",
                transform: "rotate(-20deg)",
              },
            }}
          >
            <RotateCcw size={18} />
          </IconButton>
        </section>

        <section className="filters">
          <div className="search-wrapper">
            <TextField
              label="Search Tasks"
              name="search"
              value={filters.search}
              size="small"
              onChange={handleChangeFilter}
              sx={{
                minWidth: 260,

                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#fff",
                },

                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
              }}
            />

            <button className="btn-reset-search" onClick={resetSearch}>
              <X size={18} />
            </button>
          </div>

          <FormControl
            size="small"
            sx={{
              minWidth: 180,

              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#fff",
              },
            }}
          >
            <InputLabel>Status</InputLabel>

            <Select
              name="status"
              value={filters.statusFilter}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  statusFilter: e.target.value,
                }));
              }}
            >
              <MenuItem value="all">All</MenuItem>

              {taskStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{
              minWidth: 180,

              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#fff",
              },
            }}
          >
            <InputLabel>Priority</InputLabel>

            <Select
              name="priority"
              value={filters.priorityFilter}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  priorityFilter: e.target.value,
                }));
              }}
            >
              <MenuItem value="all">All</MenuItem>

              {taskPriorities.map((prio) => (
                <MenuItem key={prio} value={prio}>
                  {prio}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            label="Completed only"
            sx={{
              ml: 0.5,

              "& .MuiTypography-root": {
                fontWeight: 500,
                color: "#334155",
              },
            }}
            control={
              <Checkbox
                name="completed"
                checked={filters.completed ?? false}
                onChange={handleChangeFilter}
              />
            }
          />

          <FormControl
            size="small"
            sx={{
              minWidth: 180,

              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "#fff",
              },
            }}
          >
            <InputLabel>Sort</InputLabel>

            <Select
              name="sort"
              value={filters.sort}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                }));
              }}
            >
              {sortTasks.map((sort) => (
                <MenuItem key={sort} value={sort}>
                  {getSortName[sort]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>
      </section>
    </div>
  );


};
