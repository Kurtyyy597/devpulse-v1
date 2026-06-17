import "./FormSessionsComponent.css";
import type { CreateSessionFormInput } from "../../../../../shared/types/forms/CreateSessionForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { createSessionSchema } from "../../../../../shared/schemas/createSessionSchemas";
import FormGroup from "../form-group/FormGroup";
import { searchTechnologies } from "../../../../../shared/helper-functions/technologies/searchTechnologies";
import { technologies } from "../../../../../shared/data/technologies";
import { useState, useRef } from "react";
import { normalizeText } from "../../../../../shared/helper-functions/normalizedText/normalizeText";
import { statuses } from "../../../../../shared/types/SessionStatus";
import { moods } from "../../../../../shared/types/Mood";
import "./FormSessionsComponent.css";
import axios from "axios";
import { Link } from "react-router-dom";
import type { SessionFormInput } from "../../../../../shared/types/forms/SessionFormInput";

export type FormSessionProps = {
  defaultValues: Partial<SessionFormInput>;
  formTitle: string;
  submitButtonText: string;
  onSubmit: (data: SessionFormInput) => unknown;
  isSubmittingText: string;

  enterTutorialText: string;
};

export default function FormsSessionComponent({
  defaultValues,
  formTitle,
  submitButtonText,
  isSubmittingText,

  enterTutorialText,

  onSubmit,
}: FormSessionProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: {
      errors,
      touchedFields,

      isDirty,
      isSubmitting,
    },
  } = useForm<SessionFormInput>({
    resolver: zodResolver(createSessionSchema),
    defaultValues,
    mode: "onBlur",
  });


  const skillsInputRef = useRef<HTMLInputElement>(null);

  const selectedSkills =
    useWatch({
      control,
      name: "skills",
    }) ?? [];

  const [skillInput, setSkillInput] = useState<string>("");

  const addSkills = (value: string) => {
    if (!value.trim()) return;

    const normalizedValues = normalizeText(value);

    const existingSkills = selectedSkills.some(
      (skill) => normalizeText(skill) === normalizedValues,
    );

    if (existingSkills) {
      return;
    }

    setValue("skills", [...selectedSkills, value], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setSkillInput("");

    skillsInputRef.current?.focus();
  };

  const removeSkill = (skillToRemove: string) => {
    setValue(
      "skills",
      selectedSkills.filter((skill) => skill !== skillToRemove),
      {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  };

  const suggestedTechnologies = skillInput.trim()
    ? searchTechnologies(skillInput, technologies).filter(
        (tech) => !selectedSkills.includes(tech.name),
      )
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      addSkills(skillInput);
    }
  };

  const handleInputSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;

    setSkillInput(target);
  };

  const handleFormSubmit = async (data: CreateSessionFormInput) => {
    try {
      setServerError(null);
      await onSubmit(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message ?? "Something went wrong");
      }
    } finally {
      console.log("data:", data)
    }
  };


 

  return (
    <div className="form-wrapper">
      <div className="form-top">
        <Link to="/sessions" className="go-back">
          {" "}
          Back{" "}
        </Link>
        <h1 className="title"> {formTitle} </h1>
      </div>

      <section className="key-shortcut">
        <span className="enter"> Click enter to {enterTutorialText} </span>
      </section>

      <section className="form-container">
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Title */}
          <FormGroup
            label="Title"
            error={
              errors.title && touchedFields.title
                ? errors.title.message
                : undefined
            }
          >
            <input
              className="input"
              placeholder="Learn react...."
              {...register("title")}
            />
          </FormGroup>

          {/* Description */}
          <FormGroup
            label="Description"
            error={
              errors.description && touchedFields.description
                ? errors.description.message
                : undefined
            }
          >
            <textarea
              className="input"
              placeholder="Type description..."
              {...register("description")}
            />
          </FormGroup>

          {/* Status */}
          <FormGroup label="Status" error={errors.status?.message}>
            <select className="select" {...register("status")}>
             
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormGroup>

          {/* Mood */}
          <FormGroup
            label="Mood"
            error={
              errors.mood && touchedFields.mood
                ? errors.mood.message
                : undefined
            }
          >
            <select className="select" {...register("mood")}>
              
              {moods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </FormGroup>

          {/* Due Date */}
          <FormGroup
            label="Due date"
            error={
              errors.dueDate && touchedFields.dueDate
                ? errors.dueDate.message
                : undefined
            }
          >
            <input
              className="input"
              type="date"
              placeholder="Type description..."
              {...register("dueDate")}
            />
          </FormGroup>

          {/* Duration */}
          <FormGroup
            label="Duration"
            error={
              errors.duration && touchedFields.duration
                ? errors.duration.message
                : undefined
            }
          >
            <input
              className="input"
              type="number"
              placeholder="how many minutes or hours"
              {...register("duration", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(String(value)),
              })}
            />
          </FormGroup>

          {/* Skills */}
          <FormGroup
            label="Add skills"
            error={
              errors.skills && touchedFields.skills
                ? errors.skills.message
                : undefined
            }
          >
            <div className="skill-input-container">
              <input
                name="skills"
                autoComplete="off"
                placeholder="react, typescript, node.js ...."
                className="input"
                value={skillInput}
                ref={skillsInputRef}
                onChange={handleInputSkillsChange}
                onKeyDown={handleKeyDown}
              />

              <button
                type="button"
                className="btn-add-skill"
                onClick={() => addSkills(skillInput)}
              >
                Add
              </button>
            </div>

            {/* Selected Skills */}
            <div className="selected-skills">
              {selectedSkills.map((s) => (
                <div key={s} className="selected-skill-chip">
                  <span className="selected"> {s} </span>
                  <button
                    type="button"
                    className="btn-remove-skill"
                    onClick={() => removeSkill(s)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Recommendation Skills */}
            <div className="recommendation-skills">
              {suggestedTechnologies.map((suggested) => (
                <div key={suggested.skillsId} className="suggested-skill-chip">
                  <button
                    type="button"
                    onClick={() => addSkills(suggested.name)}
                  >
                    {suggested.name}
                  </button>
                </div>
              ))}
            </div>
          </FormGroup>

          <div className="error">
            {serverError && (
              <span className="error-server"> {serverError} </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? isSubmittingText : submitButtonText}
          </button>
        </form>
      </section>
    </div>
  );
}
