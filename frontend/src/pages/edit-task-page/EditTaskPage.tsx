import FormComponent from "../../components/form-component/FormComponent";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { Task } from "../../../../shared/types/tasks/tasks";
import { getOneTaskService, updateTaskService } from "../../api-service/task.service";
import { useParams, useNavigate } from "react-router-dom";
import {updateTaskSchemas, type CreateTaskFormValues, type UpdateTaskDto} from "../../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import {toast} from "react-toastify"
import "./EditTaskPage.css"


function EditTaskPage() {
  const {id} = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

   const {
     data: task,
     isError,
     error,
     isLoading,
   } = useQuery<Task>({
     queryKey: ["tasks", id],

     queryFn: () => {

      if (!id) {
        throw new Error("ID Not found");
      };

       return getOneTaskService(id);
     },
     enabled: !!id,
   });

  const updateMutation = 
  useMutation({
    mutationFn: (data: UpdateTaskDto) => {
      if (!id) {
        throw new Error("ID not found");
      };
      return updateTaskService(id, data);
    },

    onSuccess: () => {
      if (!task) {
        throw new Error("Task not found")
      };

      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success(`${task.title} updated successfully`);
      navigate(`tasks/details/${id}`);
    }
  });

  const onSubmitUpdate = (data: CreateTaskFormValues) => {
    const parse = updateTaskSchemas.parse(data);
    updateMutation.mutate(parse);

  };

  if (isError) {
    return <span className="error"> {error.message}  </span>
  };

  if (isLoading) {
    return <span className="loading"> Loading... </span>
  };

  if (!task) {
    return <span className="error"> Task not found  </span>
  }

  return (
    <div className="edit-page-wrapper">
      <FormComponent
        initialValues={{
          title: task.title,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
        }}
        onSubmit={onSubmitUpdate}
        formTitle={`Update ${task?.title}`}
        submitButtonText="Changes saved"
      />
    </div>
  );
};

export default EditTaskPage;