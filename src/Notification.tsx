import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { requestPermission, onMessageListener } from "./firebase"; // Assuming firebase.ts contains the necessary implementation

interface NotificationPayload {
  notification: {
    title?: string;
    body?: string;
  };
}

function Notification() {
  const [, setNotification] = useState<NotificationPayload>({
    notification: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    const setupNotificationListener = async () => {
      await requestPermission();
      const unsubscribe = onMessageListener() as Promise<NotificationPayload>;
      unsubscribe
        .then((payload: NotificationPayload) => {
          setNotification({
            notification: {
              title: payload?.notification?.title,
              body: payload?.notification?.body,
            },
          });
          toast.success(
            `${payload?.notification?.title}: ${payload?.notification?.body}`,
            {
              duration: 60000,
              position: "top-right",
            }
          );
        })
        .catch((err: Error) => {
          return err;
        });
    };

    setupNotificationListener();

    return () => {
      // Clean up code here (if needed)
    };
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default Notification;
