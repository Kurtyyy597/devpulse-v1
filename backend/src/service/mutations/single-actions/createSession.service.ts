import type { CreateSessionForm } from "../../../../../shared/types/forms/CreateSessionForm";
import type { Session } from "../../../../../shared/types/sessions";
import { isValidInitialStatus } from "../../service-helpers/isStatusValidDefault";
import { AppError } from "../../../../../shared/errors/appError";
import { validateSkills } from "../../service-helpers/validateSkills";        
import { throwIfSameSessionCreated } from "../../service-helpers/throwIfSameSession";

export const createSessionService = async (
  data: CreateSessionForm,
  sessions: Session[],
) => {
  throwIfSameSessionCreated(sessions, data);

  const isValid = isValidInitialStatus(data);

  if (!isValid) {
    throw new AppError("Initial status should be (planned or open)", 400);
  }

  if (data.skills !== undefined) {
    validateSkills(data.skills);
  }

  const now = Date.now();

  const newSession: Session = {
    id: crypto.randomUUID(),
    title: data.title,
    description: data.description,
    createdAt: now,
    updatedAt: null,
    archivedAt: null,
    deletedAt: null,
    status: data.status ?? "open",
    duration: data.duration ?? 0,
    mood: data.mood ? data.mood : "motivated",
    activities: [],
    skills: data.skills ?? [],
    dueDate: data.dueDate,
  };

  const updatedSessions = [...sessions, newSession];

  return {
    updatedSessions,
    newSession,
  };
};
