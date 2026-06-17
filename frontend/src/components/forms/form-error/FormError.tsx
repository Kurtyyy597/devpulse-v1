import "./FormError.css";

export type FormErrorProps = {
  message?: string;
};

export default function FormError({ message }: FormErrorProps) {
  if (!message) return;

  return (
    <div className="form-error">
      <span className="form-error-text"> ⚠️ {message} </span>
    </div>
  );
}
