import { useState, useEffect } from "react";
import { useLearningHour } from "@/api/queries";
// import { notifications } from '@mantine/notifications';
// import { getApiErrorMessage } from '@/api/helper';
import { useLocation } from "react-router-dom";

const useTimeSpent = (
  contentId: number,
  profileId: number,
  subCategoryId: number
) => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const { mutateAsync } = useLearningHour();
  const [timer, setTimer] = useState(0);

  console.log(timer);
  useEffect(() => {
    let timerId: () => void;
    let time = 0;
    const startTimer = () => {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        time = time + 1;
      }, 1000); // Update the timer every 1000 milliseconds (1 second)

      return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab switched or minimized

        setVisible(false);

        timerId();
      } else {
        // Tab back in focus
        setVisible(true);
        timerId = startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    timerId = startTimer();
    return () => {
      console.log("Effect---------");

      mutateAsync({
        content_id: contentId,
        profile_id: profileId,
        timespent: time,
        sub_category_id: subCategoryId,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          // notifications.show({
          //   title: `Notification`,
          //   message: getApiErrorMessage(error),
          // });
          console.log(error);
        });

      console.log("2Effect---------2");
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      timerId();
    };
    // eslint-disable-next-line
  }, [visible, location]);
  return null;
};

export default useTimeSpent;
