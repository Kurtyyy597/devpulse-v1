import FormComponent from "../../components/form-component/FormComponent";
import { createTaskSchema, type CreateTaskDto, type CreateTaskFormValues } from "../../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { useMutation,useQueryClient } from "@tanstack/react-query";
import "./CreateTaskPage.css"
import { createTaskService } from "../../api-service/task.service";

function CreateTaskPage() {

  const initialValues: CreateTaskFormValues = {
    title: "",
    status: "open",
    priority: "low",
    description: "",
    dueDate: ""
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const createMutation = 
  useMutation({
    mutationFn: (data: CreateTaskDto) => {
      return createTaskService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Task successfully created");
      navigate(`/`);
    }
  });

  const submitCreate = (data: CreateTaskFormValues) => {
    const parse = createTaskSchema.parse(data);
    createMutation.mutate(parse);
  };



  return (
    <div className="create-page-wrapper">
      <FormComponent
      initialValues={initialValues}
      onSubmit={submitCreate}
      formTitle="Create Task"
      submitButtonText="Create"/>
    </div>
  )
};
export default CreateTaskPage;