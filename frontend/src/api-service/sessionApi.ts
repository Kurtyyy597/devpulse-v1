import { api } from "./axios";
import type { Session } from "../../../shared/types/sessions";
import type { CreateSessionFormInput,
} from "../types/CreateSessionForm";
import type { ApiResponse } from "../../../shared/types/integration/GetApiResponse";
import type { FilterSessions } from "../../../shared/types/filterSessions";
import type { GetApiResponse } from "../../../shared/types/integration/GetApiResponse";
import type { DashboardSession } from "../../../shared/types/DashboardSession";
import type { UpdateSessionFormInput } from "../types/UpdateSessionForm";

export const getAllSessions = async (
  filters: FilterSessions,
): Promise<GetApiResponse> => {
  
  
  const response = await api.get<GetApiResponse>("/sessions", {
    params: filters,
  });

  return response.data;
};

export const getOneSession = async (
  id: string,
): Promise<ApiResponse<Session>> => {
  const response = await api.get<ApiResponse<Session>>(`/sessions/${id}`);

  return response.data;
};

export const createSession = async (
  payload: CreateSessionFormInput,
): Promise<ApiResponse<Session>> => {
  const response = await api.post<ApiResponse<Session>>("/sessions", payload);

  return response.data;
};

export const updateSession = async (
  id: string,
  payload: UpdateSessionFormInput,
): Promise<ApiResponse<Session>> => {
  const response = await api.patch<ApiResponse<Session>>(
    `/sessions/${id}`,
    payload,
  );

  return response.data;
};

export const archiveSession = async (
  id: string,
): Promise<ApiResponse<Session>> => {
  const response = await api.patch<ApiResponse<Session>>(
    `/sessions/${id}/archive`,
  );

  return response.data;
};

export const restoreArchivedSession = async (
  id: string,
): Promise<ApiResponse<Session>> => {
   console.log("API CALLED", id);
   
  const response = await api.patch<ApiResponse<Session>>(
    `/sessions/${id}/restore-archived`,
  );

  return response.data;
};

export const softDeleteSession = async (
  id: string,
): Promise<ApiResponse<Session>> => {
  const response = await api.patch<ApiResponse<Session>>(
    `/sessions/${id}/soft-delete`,
  );

  return response.data;
};

export const restoreSoftDeletedSession = async (
  id: string,
): Promise<ApiResponse<Session>> => {
  const response = await api.patch<ApiResponse<Session>>(
    `/sessions/${id}/restore-deleted`,
  );

  return response.data;
};

export const permanentDeleteSession = async (
  id: string,
): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>(`/sessions/${id}`);

  return response.data;
};

export const getDashboardSessions = async (): Promise<
  ApiResponse<DashboardSession>
> => {
  const response = await api.get<ApiResponse<DashboardSession>>(
    "/sessions/dashboard",
  );

  return response.data;
};

export const getSoftDeletedASessions = async(): Promise<ApiResponse<Session[]>> => {
  const response = await api.get<ApiResponse<Session[]>>("/sessions/trash");

  return response.data
};

export const archiveManySessions = async (sessionIds: string[]): Promise<ApiResponse<Session[]>> => {
  const response = await api.patch<ApiResponse<Session[]>>("sessions/archive-many", {
    sessionIds
  });

  return response.data
};

export const restoreManyArchivedSessions = async (sessionIds: string[]): Promise<ApiResponse<Session[]>> => {
  const response = await api.patch<ApiResponse<Session[]>>("/sessions/restore-archived-many", {
    sessionIds
  });

  return response.data
};

export const softDeleteManySessions = async (sessionIds: string[]): Promise<ApiResponse<Session[]>> => {
  const response = await api.patch<ApiResponse<Session[]>>("/sessions/soft-delete-many", {
    sessionIds
  });

  return response.data
};

export const restoreManyDeletedSessions = async (sessionIds: string[]): Promise<ApiResponse<Session[]>> => {
  const response = await api.patch<ApiResponse<Session[]>>("/sessions/restore-deleted-many", {
    sessionIds
  });

  return response.data
};

export const permanentDeleteManySessions = async (sessionIds: string[]): Promise<ApiResponse<Session[]>> => {
  const response = await api.patch<ApiResponse<Session[]>>("/sessions/permanent-delete-many", {
    sessionIds
  });

  return response.data
};
