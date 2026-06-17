import type { CreateSessionFormInput } from "../../../../../shared/types/forms/CreateSessionForm";
import FormsSessionComponent from "../../../components/forms/form-sessions-component/FormSessionsComponent";
import { useCreateSession } from "../../../hooks/mutation/single-actions/useCreateSession";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import "./CreateSessionPage.css"

function CreateSessionPage() {
  const navigate = useNavigate();

  const createSession = useCreateSession();

  const handleCreateSession = async (formData: CreateSessionFormInput) => {
    await createSession.mutateAsync(formData);
    toast.success(
  <span className="success">
    <strong className="success-title">{formData.title}</strong>
    <span>successfully created</span>
  </span>
);
    navigate("/sessions");
  };

  return (
    <FormsSessionComponent
      defaultValues={{
        title: "",
        description: "",
        status: "planned",
        mood: "tired",
        dueDate: "",
        skills: [],
        duration: undefined
      }}
      formTitle="Create Session"
      submitButtonText="Confirm"
      onSubmit={handleCreateSession}
      isSubmittingText="Creating..."
      enterTutorialText="Submit"
    />
  );
}
export default CreateSessionPage;
