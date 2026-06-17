import * as sessionsController from "../controllers/session.controller";
import { Router } from "express";
import { validate } from "../middleware/validate";
import { sessionQuerySchema } from '../schemas/filters/sessionQuerySchema';
import { bulkSessionIdSchemas } from './../schemas/session-ID/bulkSessionsIdSchema';
import { sessionIdSchema } from "../schemas/session-ID/sessionIdSchema";
import { createSessionSchema } from "../schemas/create-schema/createSessionSchemas";
import { updateSessionSchema } from "../schemas/update-schema/updateSessionSchema";

const router = Router();

router.get(
  "/",
  validate(sessionQuerySchema, "query"),
  sessionsController.getAllSessionController,
);
router.get("/dashboard", sessionsController.getDashboardSessionController);

router.get(
  "/trash",
  sessionsController.getSoftDeletedSessionsServiceController,
);

router.get(
  "/:id",
  validate(sessionIdSchema, "params"),
  sessionsController.getOneSessionController,
);

router.post(
  "/",
  validate(createSessionSchema, "body"),
  sessionsController.createSessionController,
);

router.patch("/archive-many", validate(bulkSessionIdSchemas, "body"), sessionsController.archiveManySessionsController);
router.patch("/restore-archived-many", validate(bulkSessionIdSchemas, "body"), sessionsController.restoreManyArchivedSessionsController);
router.patch("/soft-delete-many", validate(bulkSessionIdSchemas, "body"), sessionsController.softDeleteManySessionsController);
router.patch("/restore-deleted-many", validate(bulkSessionIdSchemas, "body"), sessionsController.restoreManySoftDeletedController);
router.patch("/permanent-delete-many", validate(bulkSessionIdSchemas, "body"), sessionsController.permanentDeleteManySessionsController);

router.patch(
  "/:id",
  validate(sessionIdSchema, "params"),
  validate(updateSessionSchema, "body"),
  sessionsController.updateSessionController,
);

router.patch(
  "/:id/archive",
  validate(sessionIdSchema, "params"),
  sessionsController.archiveSessionController,
);

router.patch(
  "/:id/restore-archived",
  validate(sessionIdSchema, "params"),
  sessionsController.restoreArchivedSessionController,
);

router.patch(
  "/:id/soft-delete",
  validate(sessionIdSchema, "params"),
  sessionsController.softDeleteSessionController,
);

router.patch(
  "/:id/restore-deleted",
  validate(sessionIdSchema, "params"),
  sessionsController.restoreSoftDeletedSessionController,
);



router.delete(
  "/:id",
  validate(sessionIdSchema, "params"),
  sessionsController.permanentDeleteSessionController,
);



export default router;
