import axios from "axios";

import { DEPLOYED_API_GATEWAY_URL } from "../../constants";

export const getAllNotificationsByUserId = async (userId: number) => {
  try {
    const response = await axios.get(

      DEPLOYED_API_GATEWAY_URL + `/notifications?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Something went wrong with ${userId}`);
  }
};

export const patchNotificationsById = async (id: number) => {
  try {
    const response = await axios.patch(
      DEPLOYED_API_GATEWAY_URL + `/notifications/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong!!!");
  }
};
