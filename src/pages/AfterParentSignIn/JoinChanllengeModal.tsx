import Medal from "@/assets/Medal.png";
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

const JoinChanllengeModal = ({ close }: { close: () => void }) => {
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
    <div className="p-3">
      <div className="flex justify-center items-center">
        <img src={Medal} alt="image" className="w-[100px] h-[100px]" />
      </div>
      <p className="text25 text-center font-medium ">
        Ready to Join the Summer Reading Challenge?
      </p>
      <div className="flex flex-col gap-5 mt-8">
        <Button onClick={handleSubmit}>
          {" "}
          {isLoading ? (
            <p className="flex justify-center items-center">
              <Loader color="white" size="sm" />
            </p>
          ) : (
            <span className="text-white">Yes</span>
          )}
        </Button>
        <Button
          varient="outlined"
          onClick={() => {
            sessionStorage.removeItem("showJoinChallenge");
            close();
          }}
        >
          <strong className=" text-[#8530C1]">No</strong>
        </Button>
      </div>
    </div>
  );
};

export default JoinChanllengeModal;
