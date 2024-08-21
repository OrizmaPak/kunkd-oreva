// import Medal from "@/assets/Medal.png";
import Button from "@/components/Button";
import {
  querykeys,
  useGetProfile,
  useJoinSummerChallenge,
} from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { useQueryClient } from "@tanstack/react-query";
import JoinImage from "@/assets/joinImage.png";

const JoinChanllengeModal = ({
  close,
  openTopLeaderboard,
}: {
  close: () => void;
  openTopLeaderboard: () => void;
}) => {
  const { mutate, isLoading } = useJoinSummerChallenge();
  const queryClient = useQueryClient();
  useGetProfile(true);

  const profileId = sessionStorage.getItem("profileId");
  const handleSubmit = () => {
    mutate(
      {
        profile_id: Number(profileId),
      },

      {
        onSuccess(data) {
          sessionStorage.setItem("newaccount", "true");
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
          sessionStorage.removeItem("showJoinChallenge");
          queryClient.refetchQueries(querykeys.profiles).then(() => {
            close();
            openTopLeaderboard();
          });
          // refetch();
          // close();
        },

        onError(err) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };
  return (
    <div className="p-3 ">
      <p className="text25 text-center font-medium mb-4 ">Read and Win</p>
      <div className="flex justify-center items-center">
        <p>
          <img src={JoinImage} alt="image" className="w-[600px]" />
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-8">
        <Button onClick={handleSubmit}>
          {" "}
          {isLoading ? (
            <p className="flex justify-center items-center">
              <Loader color="white" size="sm" />
            </p>
          ) : (
            <span className="text-white">Join the Challenge Now</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default JoinChanllengeModal;
