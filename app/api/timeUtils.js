import { DateTime } from "luxon";

export const formatRelativeTime = (creationTime) => {
  const now = DateTime.now();
  const createdTime = DateTime.fromISO(creationTime); // Assuming ISO format
  const diffInMinutes = now.diff(createdTime, "minutes").minutes;

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} mins ago`;
  }
  if (diffInMinutes == 0) {
    return `just now`;
  }
  const diffInHours = now.diff(createdTime, "hours").hours;
  if (diffInHours < 24) {
    return `${Math.round(diffInHours)}h ago`;
  }

  const diffInDays = now.diff(createdTime, "days").days;
  return `${Math.round(diffInDays)}d ago`;
};
