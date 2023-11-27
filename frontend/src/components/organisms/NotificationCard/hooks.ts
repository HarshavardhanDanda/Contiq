import { useState, useEffect } from "react";
import {
  getAllNotificationsByUserId,
  patchNotificationsById,
} from "../../../services/NotificationService";
import { getUserById } from "../../../services/UserService";
import { getFileById } from "../../../services/FileService";
import {NotificationProps} from '.';

export const useNotificationCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState < NotificationProps[]>([]);

  const getUserData = () => {
    const userDetailsJSON = localStorage.getItem("userDetails");
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      return userDetails.id;
    } else {
      console.log("User details not found in localStorage");
    }
  };

  useEffect(() => {
    const currentUserId = getUserData();
    getAllNotificationsByUserId(currentUserId).then(async (response) => {
      const patchRequests = response
        .filter((notification: any) => {
          return !notification.isRead
        })
        .map((notification: any) => {
          return patchNotificationsById(notification.id);
        });

      await Promise.all(patchRequests)
      const allNotifications = await Promise.all(
        response.map(async (notification: any) => {
          const user = await getUserById(notification.uploadedBy);
          const file = await getFileById(notification.fileId);
          const userName = user.username;
          const fileName = file.name;
          return { ...notification, userName, fileName };
        })
      );

      setNotifications(allNotifications);
      setIsLoading(false);
    }).catch((error) => {
      console.error("error while fetching notifications", error)
    })

  }, []);

  return {
    isLoading,
    notifications
  };
};
