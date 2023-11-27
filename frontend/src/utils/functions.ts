import { DAYS_OF_WEEK } from "../constants";

export const validateString = (text: string, regex: RegExp) => {
  return regex.test(text);
};

export const dayOfWeekFormatterHandler = (day: string) => {
  return DAYS_OF_WEEK.get(day) ?? "";
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export function formatCurrentDateToString() {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} 00:00:00`;
  return formattedDate;
}

export function convertDateFormat(inputDate: string) {
  const dateObj = new Date(inputDate);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} 00:00:00`;
  return formattedDate;
}

export function getStartDateFormat(startDateLabel: string) {
  return startDateLabel === "Start date"
    ? "0000-00-00 00:00:00"
    : convertDateFormat(startDateLabel);
}

export function getEndDateFormat(endDateLabel: string) {
  return endDateLabel === "End date"
    ? formatCurrentDateToString()
    : convertDateFormat(endDateLabel);
}

export function notificationDateFormat(inputDate: string) {
  const date = new Date(inputDate);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const timePeriods = ["AM", "PM"];

  const day = date.getDate();
  const month = date.getMonth();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timePeriod = hour >= 12 ? timePeriods[1] : timePeriods[0];
  const formattedHour = hour % 12 || 12;
  const formattedDate = `${day} ${months[month]} ${formattedHour}:${(minute < 10 ? '0' : '') + minute} ${timePeriod}`;
  return formattedDate;
}

export function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const getUserData = () => {
  const userDetailsJSON = localStorage.getItem("userDetails");
  if (userDetailsJSON) {
    const userDetails = JSON.parse(userDetailsJSON);
    return userDetails.id;
  } else {
    console.log("User details not found in localStorage");
  }
};

export function byteArrayToBlob(byteArray: any) {
  return new Blob([new Uint8Array(byteArray)], { type: 'application/pdf' });
}

export function isEmptyObject(obj: any) {
  return Object.entries(obj).length === 0;
}