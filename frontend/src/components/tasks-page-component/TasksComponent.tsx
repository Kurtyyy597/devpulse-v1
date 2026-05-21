import type { Task } from "../../../../shared/types/tasks/tasks";
import { Link } from "react-router-dom";
import "./TaskComponent.css"

import {
  Plus,
  Pencil,
  Archive,
  ArchiveRestore,
  Trash2,
  EllipsisVertical,
} from "lucide-react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

export type TaskComponentProps = {
  tasks: Task[];

  isOpenTaskId: Task["id"] | null;

  setOpenTaskId: (taskId: Task["id"] | null) => void;

  clickToEdit: (taskId: Task["id"]) => void;

  archiveTask: (taskId: Task["id"]) => void;

  openModalDeleteTask: (taskId: Task["id"] | null) => void;

  restoreTask: (taskId: Task["id"]) => void;

  openTaskDetails: (taskId: Task["id"]) => void;
};

export default function TasksComponents({
  tasks,
  isOpenTaskId,
  setOpenTaskId,
  clickToEdit,
  archiveTask,
  openModalDeleteTask,
  restoreTask,
  openTaskDetails,
}: TaskComponentProps) {
  return (
    <div className="task-wrapper">
      <section className="top">
        <h1 className="task-title">Tasks List</h1>

        <Link to="/tasks/create">
          <IconButton>
            <Plus size={20} />
          </IconButton>
        </Link>
      </section>

      <section className="tasks-table-container">
        {tasks.length === 0 ? (
          <div className="no-tasks-container">
            <h2>No tasks found</h2>

            <div>
              <p className="tasks-paragraph"> Create your first task to get started </p>
              <Link to="/tasks/create"> <Plus size={16}/> </Link>
            </div>
          </div>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>

                  <TableCell>Description</TableCell>

                  <TableCell>Status</TableCell>

                  <TableCell>Priority</TableCell>

                  <TableCell>Date Created</TableCell>

                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((t) => (
                  <TableRow
                    key={t.id}
                    hover
                    onClick={() => {
                      openTaskDetails(t.id);
                    }}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{t.title}</TableCell>

                    <TableCell
                      sx={{
                        maxWidth: 250,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {t.description || "No description"}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={t.status}
                        size="small"
                        color={
                          t.status === "done"
                            ? "success"
                            : t.status === "in-progress"
                              ? "warning"
                              : "default"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={t.priority}
                        size="small"
                        color={
                          t.priority === "high"
                            ? "error"
                            : t.priority === "medium"
                              ? "warning"
                              : "success"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(t.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();

                          clickToEdit(t.id);
                        }}
                      >
                        <Pencil size={18} />
                      </IconButton>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();

                          archiveTask(t.id);
                        }}
                      >
                        <Archive size={18} />
                      </IconButton>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenTaskId(isOpenTaskId === t.id ? null : t.id);
                        }}
                      >
                        <EllipsisVertical size={18} />
                      </IconButton>

                      {isOpenTaskId === t.id && (
                        <div className="more-actions-menu">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();

                              restoreTask(t.id);
                            }}
                          >
                            <ArchiveRestore size={18} />
                          </IconButton>

                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();

                              openModalDeleteTask(t.id);
                            }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </section>
    </div>
  );
}
