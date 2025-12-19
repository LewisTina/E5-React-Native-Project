import { config } from "@/utils/env";

export const basUrl = config.mockBackendUrl;

export const UserUrl = {
  /* Authentication */
  POST_LOGIN: `${basUrl}auth/login`,

  /* Trips */
  GET_TRIPS: `${basUrl}/trips`,
  GET_UPCOMING_TRIPS: `${basUrl}/trips/upcoming`,
  GET_STATS: `${basUrl}/stats`,

  /* Activities */
  GET_ACTIVITIES: `${basUrl}/activities`,
};
