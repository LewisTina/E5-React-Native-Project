import BaseServices from "./baseservices";
import { UserUrl } from "./urls";

class UserServices {
  /* Get Requests */

  static getTrips = () =>
    BaseServices.getRequest({
      url: UserUrl.GET_TRIPS,
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
}

export default UserServices;
