import { useEffect } from "react";
import "./FormComponent.css"

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { TextField, Button, MenuItem, Box } from "@mui/material";
import type {  CreateTaskFormValues,  } from "../../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";

import {
  createTaskSchema,
  taskPriorities,
  taskStatuses,
} from "../../../../backend/src/backend-with-env-variables/schemas/Tasks/taskSchema";

type FormComponentProps = {
  initialValues?: Partial<CreateTaskFormValues>;

  onSubmit: (data: CreateTaskFormValues) => void;

  formTitle: string;

  submitButtonText: string;
};

export default function FormComponent({
  initialValues,
  onSubmit,
  formTitle,
  submitButtonText,
}: FormComponentProps) {
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, touchedFields, isDirty, isValid, isSubmitting },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),

    mode: "onChange",

    defaultValues: {
      title: "",
      status: "open",
      priority: "low",
      description: "",
      dueDate: "",

      ...initialValues
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <div className="form-wrapper">
      <h1 className="form-title">{formTitle}</h1>

      <section className="form-container">
        <Box
          component="form"
          className="form-card"
          onSubmit={handleSubmit(onSubmit)}
          
        >
          {/* TITLE */}

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={touchedFields.title && !!errors.title}
                helperText={touchedFields.title ? errors.title?.message : ""}
              />
            )}
          />

          {/* DESCRIPTION */}

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                error={touchedFields.description && !!errors.description}
                helperText={
                  touchedFields.description ? errors.description?.message : ""
                }
              />
            )}
          />

          {/* PRIORITY */}

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Priority"
                error={touchedFields.priority && !!errors.priority}
                helperText={
                  touchedFields.priority ? errors.priority?.message : ""
                }
              >
                {taskPriorities.map((t) => (
                  <MenuItem value={t} key={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* STATUS */}

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                error={touchedFields.status && !!errors.status}
                helperText={touchedFields.status ? errors.status?.message : ""}
              >
                {taskStatuses.map((s) => (
                  <MenuItem value={s} key={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* DUE DATE */}

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="datetime-local"
                label="Due Date"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={
                  typeof field.value === "number"
                    ? new Date(field.value).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) => {
                  const value = e.target.value;

                  field.onChange(value ? new Date(value).getTime() : undefined);
                }}
                error={touchedFields.dueDate && !!errors.dueDate}
                helperText={
                  touchedFields.dueDate ? errors.dueDate?.message : ""
                }
              />
            )}
          />

          {/* SUBMIT */}

          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : submitButtonText}
          </Button>
        </Box>
      </section>
    </div>
  );
}
