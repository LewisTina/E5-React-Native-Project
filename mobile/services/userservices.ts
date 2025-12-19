import Trip from "@/types/trip";
import BaseServices from "./baseservices";
import { UserUrl } from "./urls";

class UserServices {
  /* Get Requests */

  static getTrips = () =>
    BaseServices.getRequest({
      url: UserUrl.GET_TRIPS,
      required_auth: true,
    });

  static getTripById = (id: string) =>
    BaseServices.getRequest({
      url: `${UserUrl.GET_TRIPS}/${id}`,
      required_auth: true,
    });

  static getUpcomingTrips = () =>
    BaseServices.getRequest({
      url: UserUrl.GET_UPCOMING_TRIPS,
      required_auth: true,
    });

  static getStatistics = () =>
    BaseServices.getRequest({
      url: UserUrl.GET_STATS,
      required_auth: true,
    });

  static getActivities = () =>
    BaseServices.getRequest({
      url: UserUrl.GET_ACTIVITIES,
      required_auth: true,
    });

  /* Post Requests */

  static postCreateTrip = (trip: Omit<Trip, "id">) =>
    BaseServices.postRequest({
      url: UserUrl.POST_TRIP,
      required_auth: true,
      body: trip,
    });

  static postUploadImage = (formData: FormData) =>
    BaseServices.postRequest(
      {
        url: UserUrl.POST_UPLOAD_IMAGE,
        required_auth: true,
        body: formData,
      },
      true,
    );
}

export default UserServices;
