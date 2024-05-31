import { motion } from "framer-motion";
import { useRemoveAccount } from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import moengage from "@moengage/web-sdk";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
import { handleEventTracking } from "@/api/moengage";

const DeleteAccount = ({ onCancel }: { onCancel: () => void }) => {
  const [user] = useStore(getUserState);

  const navigate = useNavigate();
  const { mutate, isLoading } = useRemoveAccount();
  function formatTimeComponent(component: number) {
    return component < 10 ? "0" + component : component;
  }
  const currentTime = new Date();
  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  // Formatting the time components
  const timeString =
    formatTimeComponent(hours) +
    ":" +
    formatTimeComponent(minutes) +
    ":" +
    formatTimeComponent(seconds);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day = currentDate.getDate();
  const formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (day < 10 ? "0" + day : day);
  const handleRemoveAccount = () => {
    mutate(
      {},
      {
        async onSuccess(data) {
          handleEventTracking(
            `${
              user?.role == "teacher"
                ? "teacher"
                : user?.role == "user"
                ? "parent"
                : "school"
            }_delete_account`,
            {
              user_id: user?.user_id,
              date_deleted: formattedDate,
              time_deleted: timeString,
            }
          );
          sessionStorage.clear();
          onCancel();
          navigate("/");

          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },
        onError() {
          notifications.show({
            title: `Notification`,
            message: "Invalid username or password",
          });
        },
      }
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="py-5"
    >
      <h1 className="font-bold text25 text-center font-Recoleta mb-2 leading-[30px]">
        Are you sure you want to delete your account?
      </h1>
      <p className="text-center mb-16  font-Inter   ">
        If you delete your account, you can’t recover it.
      </p>

      <div className="flex justify-end gap-4 mb-5 px-5">
        <Button
          varient="outlined"
          onClick={onCancel}
          className="p-4 px-10  text-black rounded-full flex-grow"
        >
          Cancel
        </Button>
        <Button
          onClick={handleRemoveAccount}
          className="p-4 px-10 bg-red-600 text-white rounded-full flex-grow"
        >
          {isLoading ? (
            <p className="flex justify-center items-center">
              <Loader color="white" size="sm" />
            </p>
          ) : (
            <span>Delete</span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default DeleteAccount;
