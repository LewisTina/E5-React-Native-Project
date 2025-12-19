import { OFFLINE } from "@/services/offline";
import UserServices from "@/services/userservices";
import { Activity } from "@/types/activities";
import Trip, { TripStatistics } from "@/types/trip";
import useCheckResponse from "./use-check-response";

export function useTrips() {
  const { checkMutationResponse } = useCheckResponse();
  const { uploadImage } = useImage();

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

  const createTrip = async (payload: {
    trip: Omit<Trip, "id">;
    onSuccess?: (createdTrip: Trip) => void;
  }) => {
    const isOnline = await OFFLINE.checkIsOnline();
    if (isOnline) {
      const uploadImages = async () => {
        const photos: string[] = [];
        let coverImage = "";

        for (let i = 0; i < (payload.trip.photos ?? []).length; i++) {
          const selectedImage = payload.trip.photos?.[i];
          if (!selectedImage) continue;
          const url = await uploadImage(selectedImage);
          photos.push(url?.data?.url || "");
          if (i === 0) coverImage = url?.data?.url || "";
        }

        console.log(photos, coverImage);

        return { photos, coverImage };
      };

      const { photos, coverImage } = await uploadImages();
      const createdTrip = await UserServices.postCreateTrip({
        ...payload.trip,
        photos,
        image: coverImage,
      }).then(async (res: Response) => {
        const response = await checkMutationResponse<Trip>({
          res,
          onSuccess: {
            action: payload.onSuccess,
          },
        });
        return response;
      });
      return createdTrip;
    } else {
      console.log("Offline: Add to queue");

      await OFFLINE.addToQueue({
        type: "CREATE",
        endpoint: "/trips",
        method: "POST",
        payload: payload.trip,
      });

      return {
        ...payload.trip,
        id: `local-${Date.now()}`,
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
    createTrip,
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

export function useImage() {
  const { checkMutationResponse } = useCheckResponse();

  const uploadImage = async (uri: string) => {
    const formData = new FormData();

    const filename = uri.split("/").pop() || "photo.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("file", {
      uri,
      name: filename,
      type,
    } as any);

    const response = await UserServices.postUploadImage(formData).then(
      async (res: Response) => {
        const checkedResponse = await checkMutationResponse<{ url: string }>({
          res,
        });
        return checkedResponse;
      },
    );
    console.log(response);
    return response;
  };

  return { uploadImage };
}
