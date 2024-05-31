import moengage from "@moengage/web-sdk";
import { getAnalytics, logEvent } from "firebase/analytics";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
const day = currentDate.getDate();
export const formattedDate =
  year +
  "-" +
  (month < 10 ? "0" + month : month) +
  "-" +
  (day < 10 ? "0" + day : day);

const analytics = getAnalytics();

const currentTime = new Date();
// Extract hours, minutes, and seconds
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const seconds = currentTime.getSeconds();
// Formatting the time components
function formatTimeComponent(component: number) {
  return component < 10 ? "0" + component : component;
}
export const timeString =
  formatTimeComponent(hours) +
  ":" +
  formatTimeComponent(minutes) +
  ":" +
  formatTimeComponent(seconds);

export const handleEventTracking = (event: string, attributes: any) => {
  moengage.track_event(event, attributes);
  logEvent(analytics, event, attributes);
};
