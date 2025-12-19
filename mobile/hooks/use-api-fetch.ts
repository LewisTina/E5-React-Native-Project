import { OFFLINE } from "@/services/offline";
import UserServices from "@/services/userservices";
import { Activity } from "@/types/activities";
import Trip, { TripStatistics } from "@/types/trip";
import useCheckResponse from "./use-check-response";

export function useTrips() {
  const { checkMutationResponse } = useCheckResponse();

  const retrieveTrips = async () => {
    const isOnline = await OFFLINE.checkIsOnline();

    if (isOnline) {
      try {
        const trips = await UserServices.getTrips().then(
          async (res: Response) => {
            const response = await checkMutationResponse<Trip[]>({
              res,
            });
            return response;
          },
        );
        await OFFLINE.cacheTrips(trips.data);
        return trips;
      } catch (error) {
        console.log("Erreur fetch, utilisation du cache", error);
        const cached = await OFFLINE.getCachedTrips();

        return {
          status: 500,
          data: cached || [],
        };
      }
    } else {
      console.log("Offline, utilisation du cache");
      const cached = await OFFLINE.getCachedTrips();

      return {
        status: 500,
        data: cached || [],
      };
    }
  };

  const retrieveTripById = async (id: string) => {
    const trips = await UserServices.getTripById(id).then(
      async (res: Response) => {
        const response = await checkMutationResponse<Trip>({
          res,
        });
        return response;
      },
    );
    return trips;
  };

  const retrieveStatistics = async () => {
    const isOnline = await OFFLINE.checkIsOnline();

    if (isOnline) {
      try {
        const statistics = await UserServices.getStatistics().then(
          async (res: Response) => {
            const response = await checkMutationResponse<TripStatistics>({
              res,
            });
            return response;
          },
        );
        await OFFLINE.cachedStatistics(statistics.data);
        return statistics;
      } catch (error) {
        console.log("Erreur fetch, utilisation du cache", error);
        const cached = await OFFLINE.getCachedStatistics();

        return {
          status: 500,
          data: cached,
        };
      }
    } else {
      console.log("Offline, utilisation du cache");
      const cached = await OFFLINE.getCachedStatistics();

      return {
        status: 500,
        data: cached,
      };
    }
  };

  const retrieveUpcomingTrips = async () => {
    const isOnline = await OFFLINE.checkIsOnline();

    if (isOnline) {
      try {
        const trips = await UserServices.getUpcomingTrips().then(
          async (res: Response) => {
            const response = await checkMutationResponse<Trip[]>({
              res,
            });
            return response;
          },
        );
        return trips;
      } catch (error) {
        console.log("Erreur fetch, utilisation du cache", error);
        const cached = await OFFLINE.getCachedTrips();
        return {
          status: 500,
          data: (cached || []).splice(0, 3),
        };
      }
    } else {
      console.log("Offline, utilisation du cache");
      const cached = await OFFLINE.getCachedTrips();

      return {
        status: 500,
        data: (cached || []).splice(0, 3),
      };
    }
  };

  return {
    retrieveTrips,
    retrieveStatistics,
    retrieveUpcomingTrips,
    retrieveTripById,
  };
}

export function useActivities() {
  const { checkMutationResponse } = useCheckResponse();

  const retrieveActivities = async () => {
    const isOnline = await OFFLINE.checkIsOnline();

    if (isOnline) {
      try {
        const activities = await UserServices.getActivities().then(
          async (res: Response) => {
            const response = await checkMutationResponse<Activity[]>({
              res,
            });
            return response;
          },
        );
        await OFFLINE.cacheActivities(activities.data);
        return activities;
      } catch (error) {
        console.log("Erreur fetch, utilisation du cache", error);
        const cached = await OFFLINE.getCachedActivities();

        return {
          status: 500,
          data: cached || [],
        };
      }
    } else {
      console.log("Offline, utilisation du cache");
      const cached = await OFFLINE.getCachedActivities();

      return {
        status: 500,
        data: cached || [],
      };
    }
  };

  return { retrieveActivities };
}
