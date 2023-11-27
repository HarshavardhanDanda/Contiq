import { useState, useEffect } from "react";
import { getAllNotificationsByUserId } from "../../../services/NotificationService";
import { getAllSearchResults } from "../../../services/FileService";

export const useHeaderHooks = () => {

  const [searchText, setSearchText] = useState("");
  const [notificationPanel, setNotificationPanel] = useState(false);
  const [profilePanel, setProfilePanel] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
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
    const getNotificationCount = async () => {
      const userId = getUserData();
      const notifications = await getAllNotificationsByUserId(userId);
      setNotificationCount(
        notifications.filter((notification: any) => !notification.isRead).length
      );
    };
    getNotificationCount();
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchText(value);
    await getAllSearchResults(value).then((data) => (
      setSearchResults(data)
    ))
  };

  const handleNotifications = () => {
    setNotificationPanel(!notificationPanel)
    setNotificationCount(0)
  }

  const handleProfile = () => {
    setProfilePanel(!profilePanel);
  };

  return {
    searchText,
    handleSearch,
    notificationPanel,
    setNotificationPanel,
    handleNotifications,
    profilePanel,
    handleProfile,
    notificationCount,
    searchResults
  };
};
