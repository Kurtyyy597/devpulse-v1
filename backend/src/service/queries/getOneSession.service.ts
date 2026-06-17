import { getSessionOrThrow } from "../service-helpers/getSessionOrThrow";
import type { Session } from "../../../../shared/types/sessions";


export const getOneSessionService = (id: string, sessions: Session[]) => {
  return getSessionOrThrow(sessions, id);
};
