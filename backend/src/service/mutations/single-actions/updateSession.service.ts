import { getOneSessionService } from './../../queries/getOneSession.service';
import { throwIfClosed } from '../../service-helpers/throwIfClosed';
import { throwIfArchived } from '../../service-helpers/throwIfArchived';
import { throwIfDeleted } from '../../service-helpers/throwIfDeleted';
import { isSessionChanged } from '../../service-helpers/isSessionChanged';
import { AppError } from '../../../../../shared/errors/appError';
import { validateStatusTransition } from '../../service-helpers/isStatusValid';
import { validateSkills } from '../../service-helpers/validateSkills';
import type { Session } from '../../../../../shared/types/sessions';
import { pushNewActivities } from '../../service-helpers/activities/pushNewActivities';
import type { UpdateSessionForm } from '../../../types/forms/UpdateSessionForm';

export const updateSessionService = async (
  id: string,
  data: UpdateSessionForm,
  sessions: Session[],
) => {
  const session = getOneSessionService(id, sessions);

  throwIfClosed(session.status);

  throwIfArchived(
    session,
    `${session.title} must be unarchived before editing`,
  );
  throwIfDeleted(
    session,
    `${session.title} cannot be edited because it's in trash bin`,
  );

  const isChanged = isSessionChanged(session, data);

  if (!isChanged) {
    throw new AppError("No changes detected");
  }

  if (data.status !== undefined) {
    const isValidStatus = validateStatusTransition(session.status, data.status);

    if (!isValidStatus) {
      throw new AppError("Invalid status transition");
    };
  };

  if (data.skills !== undefined) {
    validateSkills(data.skills);
  }

  const editedSession: Session = {
    ...session,
    ...data,
    updatedAt: Date.now(),
    activities: pushNewActivities(session, data),
  };

  const updatedSessions = sessions.map((s) =>
    s.id === id ? editedSession : s,
  );

  return {
    updatedSessions,
    editedSession,
  };
};
