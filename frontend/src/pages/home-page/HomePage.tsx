import FilterTaskComponent from "../../components/filter-component/FilterTaskComponent";
import TasksComponents from "../../components/tasks-page-component/TasksComponent";
import {useState } from "react";
import type { FilterTasks } from "../../../../shared/types/tasks/FilterTasks";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { archiveTaskService, getAllTasksService, permanentlyRemoveTaskService, restoreTaskService } from "../../api-service/task.service";
import type { Task } from "../../../../shared/types/tasks/tasks";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import DeleteModalComponent from "../../components/delete-modal-component/DeleteModalComponent";
import "./Homepage.css"

function HomePage() {
  const [filters, setFilters] = useState<FilterTasks>({
    search: "",
    statusFilter: "all",
    priorityFilter: "all",
    completed: false,
    sort: "createdAt-asc"
  });

  const [isOpenTaskId, setIsOpenTaskId] = useState<string | null>(null);

  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);  
  
  const navigate = useNavigate();

  const { 
    data: tasks = [], 
    isError,
    error, 
    isLoading 
  } = useQuery<Task[]>({
    queryKey: ["tasks", filters],
    queryFn: () => getAllTasksService(filters),
  });



  const clickToEdit = (taskId: Task["id"]) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const openTaskDetails = (taskId: Task["id"]) => {
    navigate(`/tasks/details/${taskId}`);
  };

  const openModalDelete = (taskId: Task["id"] | null) => {
    setDeleteTaskId(taskId);
  };

  const queryClient = useQueryClient();

  const archiveMutation =
  useMutation({
    mutationFn: archiveTaskService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Task successfully archived");
    }
  });

  const archiveTask = (taskId: Task["id"]) => {
    archiveMutation.mutate(taskId);
  };

  const restoreMutation = 
  useMutation({
    mutationFn: restoreTaskService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Task successfully restored");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: permanentlyRemoveTaskService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast.success("Task permanently deleted");

      closeModal();
    },

    onError: (error) => {
      console.log(error);

      toast.error("Failed to delete task");
    },
  });

  const permenentDeleteTask = () => {
    if (!deleteTaskId) return;

    deleteMutation.mutate(deleteTaskId);
  };

  const restoreTask = (taskId: Task["id"]) => {
    restoreMutation.mutate(taskId);
    toast.success("Task sucessfully restored");
  };

  if (isLoading) {
    return <span className="loading"> Loading... </span>
  };

  if (isError) {
    return <span className="error"> {error.message} </span>
  }

  const closeModal = () => {
    setDeleteTaskId(null);
  };

  const selectedTask = tasks.find((t) => t.id === deleteTaskId);

  console.log(tasks);
  console.log(Array.isArray(tasks));
  console.log(isLoading);
  console.log(isError);
  console.log(error);

  return (
    <div className="home-wrapper">
      <FilterTaskComponent
      filters={filters}
      setFilters={setFilters}/>

      <TasksComponents
      tasks={tasks}
      isOpenTaskId={isOpenTaskId}
      setOpenTaskId={setIsOpenTaskId}
      clickToEdit={clickToEdit}
      archiveTask={archiveTask}
      openModalDeleteTask={openModalDelete}
      restoreTask={restoreTask}
      openTaskDetails={openTaskDetails}/>

      {deleteTaskId !== null && selectedTask && (
        <DeleteModalComponent
        task={selectedTask!}
        open={!!deleteTaskId}
        onClose={closeModal}
        onConfirm={permenentDeleteTask}/>
      )}
    </div>
  )


}
export default HomePage;

