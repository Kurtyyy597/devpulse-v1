import asyncHandler from "express-async-handler";
import { getAllSessionsService } from "../service/queries/getAllSessions.service";
import { getOneSessionService } from "../service/queries/getOneSession.service";
import { updateSessionService } from "../service/mutations/single-actions/updateSession.service";
import { softDeleteSessionService } from "../service/mutations/single-actions/softDeleteSession.service";
import { archiveSessionService } from "../service/mutations/single-actions/archiveSession.service";
import { restoreArchivedSessionService } from "../service/mutations/single-actions/restoreArchivedSession.service";
import { restoreDeletedSessionService } from "../service/mutations/single-actions/restoreDeletedSession.service";
import type { CreateSessionForm } from "../types/forms/CreateSessionForm";
import type { UpdateSessionForm } from "../types/forms/UpdateSessionForm";
import { Request, Response } from "express";
import { parseSessionQuery } from "../../../shared/helper-functions/filter/getParseFilter";
import type { Session } from "../../../shared/types/sessions";
import { permanentDeleteService } from "../service/mutations/single-actions/permanentDelete.service";
import { getDashboardSessionService } from "../service/queries/getDashboardSession.service";
import { getSoftDeletedSessionsService } from "../service/queries/getSoftDeletedSession.service";
import { createSessionService } from "../service/mutations/single-actions/createSession.service";
import { archiveManySessionsService } from "../service/mutations/bulk-actions/archiveManySessions.service";
import { restoreManyArchivedSessionsService } from "../service/mutations/bulk-actions/restoreManyArchivedSessions.service";
import { softDeleteManySessionsService } from "../service/mutations/bulk-actions/softDeleteManySessions.service";
import { restoreManySoftDeletedSessionsService } from "../service/mutations/bulk-actions/restoreManySoftDeletedSessions.service";
import { permanentDeleteManySessionsService } from "../service/mutations/bulk-actions/permanentDeleteManySessions.service";
let sessions: Session[] = [];

export const getAllSessionController = asyncHandler(
  async(
    req: Request,
    res: Response
  ) => {

    const parsedQuery = parseSessionQuery(req.query);
    const result = await getAllSessionsService(sessions, parsedQuery);

    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      data: result.data,
      totalUnfilteredSessions: result.totalUnfilteredSessions,
      filters: {
        search: parsedQuery.search,
        status: parsedQuery.status,
        mood: parsedQuery.mood,
        view: parsedQuery.view
      },
      sort: parsedQuery.sort,
      pagination: result.pagination,
      
    });
  }
);

export const getOneSessionController = asyncHandler(
  async(
    req: Request<{id: string}>,
    res: Response
  ) => {
    const session = await getOneSessionService(req.params.id, sessions);

    res.status(200).json({
      success: true,
      message: `${session.title} fetched successfully`,
      data: session
    });

  
  }
);

export const createSessionController = asyncHandler(
  async(
    req: Request<{}, {}, CreateSessionForm>,
    res: Response
  ) => {
    const session = await createSessionService(req.body, sessions);
    

    sessions = session.updatedSessions

    res.status(201).json({
      success: true,
      message: "New session created successfully",
      data: session.newSession,
   
    });


    
  }
);

export const updateSessionController = asyncHandler(
  async(
    req: Request<{id: string}, {}, UpdateSessionForm>,
    res: Response
  ) => {
    const newSession = await updateSessionService(req.params.id, req.body, sessions);

    sessions = newSession.updatedSessions

    res.status(200).json({
      success: true,
      message: `Session updated successfully`,
      data: newSession.editedSession,
    
    });
  }
);

export const archiveSessionController = asyncHandler(
  async(
    req: Request<{id: string}>,
    res: Response
  ) => {
    const archivedSession = await archiveSessionService(req.params.id, sessions);

    sessions = archivedSession.updatedSessions

    res.status(200).json({
      success: true,
      message: "Session got archived successfully",
      data: archivedSession.archivedSession,
     
    });
  }
);

export const restoreArchivedSessionController = asyncHandler(
  async(
    req: Request<{id: string}>,
    res: Response
  ) => {
    const restoredSession = await restoreArchivedSessionService(req.params.id, sessions);

    console.log(
  "CONTROLLER RESPONSE",
  restoredSession.restoredSession
);

    sessions = restoredSession.updatedSessions

    res.status(200).json({
      success: true,
      message: "Session got restored successfully",
      data: restoredSession.restoredSession,
    });
  }
);

export const softDeleteSessionController = asyncHandler(
  async(
    req: Request<{id: string}>,
    res: Response
  ) => {
    const softDeletedSession = await softDeleteSessionService(req.params.id, sessions);

    sessions = softDeletedSession.updatedSessions;

    res.status(200).json({
      success: true,
      message: "Session got soft deleted successfully",
      data: softDeletedSession.softDeletedSession,
     
    });
  }
);

export const restoreSoftDeletedSessionController = asyncHandler(
  async(
    req: Request<{id: string}>,
    res: Response
  ) => {
    const restoredSession = await restoreDeletedSessionService(req.params.id, sessions);

    sessions = restoredSession.updatedSessions

    res.status(200).json({
      success: true,
      message: "Session restored from bin history",
      data: restoredSession.restoredDeletedSession,
      
    });
  }
);

export const permanentDeleteSessionController = asyncHandler(
  async(
    req: Request<{id: string}>,
    res: Response
  ) => {
    const deletedSession = await permanentDeleteService(req.params.id, sessions);

    sessions = deletedSession.updatedSessions

    res.status(200).json({
      success: true,
      message: `Session deleted successfully`,
      data: deletedSession.deletedSessionID
    });
  }
);

export const getDashboardSessionController = asyncHandler(
  async(
    req: Request,
    res: Response
  ) => {
    const dashboard = await getDashboardSessionService(sessions);

    res.status(200).json({
      success: true,
      message: "Dashboard successfully load",
      data: dashboard
    });
  }
);

export const getSoftDeletedSessionsServiceController = asyncHandler(
  async(
    req: Request,
    res: Response
  ) => {
    const softDeleted = await getSoftDeletedSessionsService(sessions);

    res.status(200).json({
      success: true,
      message: "Soft deleted sessions successfully load",
      data: softDeleted
    })
  }
);

export const archiveManySessionsController = asyncHandler(
  async(
    req: Request<{}, {}, {sessionIds: string[]}> ,
    res: Response
  ) => {
    const result = archiveManySessionsService(req.body.sessionIds, sessions);

    sessions = result.updatedSessions

    res.status(200).json({
      success: true,
      message: "Sessions successfully archived",
      data: result.archivedSessions,
      
    });
  }
);

export const restoreManyArchivedSessionsController = asyncHandler(
  async(
    req: Request<{}, {}, {sessionIds: string[]}>,
    res: Response
  ) => {
    const result = restoreManyArchivedSessionsService(req.body.sessionIds, sessions);

    sessions = result.updatedSessions

    res.status(200).json({
      success: true,
      message: "Sessions successfully restored",
      data: result.restoredSessions
    });
  }
);

export const softDeleteManySessionsController = asyncHandler(
  async(
    req: Request<{}, {}, {sessionIds: string[]}>,
    res: Response
  ) => {
    const result = softDeleteManySessionsService(req.body.sessionIds, sessions);

    sessions = result.updatedSessions

    res.status(200).json({
      success: true,
      message: "Sessions soft deleted successfully",
      data: result.deletedSessions,
    });
  }
);

export const restoreManySoftDeletedController = asyncHandler(
  async(
    req: Request<{}, {}, {sessionIds: string[]}>,
    res: Response
  ) => {
    const result = restoreManySoftDeletedSessionsService(req.body.sessionIds, sessions);

    sessions = result.updatedSessions

    res.status(200).json({
      success: true,
      message: "deleted sessions successfully restored",
      data: result.restoredSessions
    });
  }
);

export const permanentDeleteManySessionsController = asyncHandler(
  async(
    req: Request<{}, {}, {sessionIds: string[]}>,
    res: Response
  ) => {
    const result = permanentDeleteManySessionsService(req.body.sessionIds, sessions);

    sessions = result.updatedSessions

    res.status(200).json({
      success: true,
      message: "Selected sessions were permanently deleted successfully",
      data: result.deletedSessions
    });
  }
);


