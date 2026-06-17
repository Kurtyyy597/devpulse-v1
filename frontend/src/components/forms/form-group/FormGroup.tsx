import type { ReactNode } from "react";
import FormError from "../form-error/FormError";
import "./FormGroup.css";

export type FormGroupProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export default function FormGroup({ label, error, children }: FormGroupProps) {
  return (
    <div className="form-group">
      <label className="form-group-label"> {label} </label>
      {children}
      <FormError message={error ? error : undefined} />
    </div>
  );
}
