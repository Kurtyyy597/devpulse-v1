import FormsSessionComponent from "../../../components/forms/form-sessions-component/FormSessionsComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateSession } from "../../../hooks/mutation/single-actions/useUpdateSession";
import { toast } from "react-toastify";
import { useSession } from "../../../hooks/queries/useSession";
import type { UpdateSessionFormInput } from "../../../../../shared/types/forms/UpdateSessionForm";


function UpdateSessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editSession = useUpdateSession();

  const { data, isLoading, error } = useSession(id ?? "");

  if (isLoading) {
    return <span className="loading">Loading...</span>;
  }

  if (error) {
    return <span className="error">{error.message}</span>;
  }

  if (!data) {
    return <span className="error">Data not found</span>;
  }

  const session = data.data;

  const handleSubmitSession = async (data: UpdateSessionFormInput) => {
    if (!id) {
      toast.error("Id not found");
      return;
    }
    await editSession.mutateAsync({
      id,
      payload: data,
    });
    toast.success(
      <span className="success"> <strong className="title"> {data.title} </strong> successfully updated </span>
    )
    navigate(`/sessions/${id}`);
  };

  return (
    <div>
      <FormsSessionComponent
        defaultValues={{
          title: session.title ?? "",
          description: session.description ?? "",
          status: session.status ?? "planned",
          mood: session.mood ?? "tired",
          duration: session.duration ? session.duration : undefined,
          dueDate: session.dueDate ?? "",
          skills: session.skills ?? [],
        }}
        formTitle={`Edit ${session.title}`}
        submitButtonText="Save changes"
        isSubmittingText="Saving..."
        onSubmit={handleSubmitSession}
        enterTutorialText="Update"
      />
    </div>
  );
}

export default UpdateSessionPage;
