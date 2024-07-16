import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { GrNext } from "react-icons/gr";
import {
  useGetSummerChallengeQuizzes,
  useGetSummerQuiz,
  useGetContentById,
} from "@/api/queries";
import { useNavigate } from "react-router-dom";
type TQuiz = {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  publish_date: string;
  date_added: string;
};
const PreviewSummerChallengePage = () => {
  const { data: data } = useGetSummerChallengeQuizzes(
    sessionStorage.getItem("profileId") as string
  );
  const quizzes = data?.data?.data?.quizzes;
  const quizId = sessionStorage.getItem("summerQuizId");
  const { data: quiz, isLoading } = useGetSummerQuiz(
    quizId?.toString() as string
  );
  const requireData = quiz?.data?.data;

  function findObjectById(array: TQuiz[]) {
    // Loop through the array to find the object with id === 5
    for (let i = 0; i < array?.length; i++) {
      if (array[i]?.id === Number(quizId)) {
        return array[i];
      }
    }

    // Return null if no object with id === 5 is found
    return null;
  }
  // const [contents, setContents] = useState([])
  //   for (let i = 0; i < requireData?.requirements?.length; i++) {
  //    const {data }=  useGetContentById(requireData?.requirements[i]?.id, sessionStorage.getItem("profileId") as string)
  //     setContents((pre)=> [...prev, data?.data?.data])
  //     // if (array[i]?.id === Number(quizId)) {
  //     //   return array[i];
  //     // }
  //   }

  const selectedQuiz = findObjectById(quizzes);
  console.log("The Selected Quiz", requireData?.requirements);
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="flex gap-3">
            <button className="text-[18px] font-bold flex">
              Storie <GrNext size={20} />
            </button>
            <button className="text-[18px] font-bold flex">
              Summer Challenge <GrNext size={20} />
            </button>
            <button className="text-[18px] font-bold text-[#8530C1]">
              {selectedQuiz?.name}
            </button>
          </div>
          <div className="grid grid-cols-2 mt-10 bg-gradient-to-r from-[#8530C1]  to-[#3F175B] p-16 rounded-xl ">
            <div>
              <p className="text-[25px] font-Inter font-bold flex-grow-1 mb-10 text-white">
                {selectedQuiz?.name}
              </p>
              <button
                onClick={() => navigate("../summer-challenge-quiz")}
                className="px-10 py-3 rounded bg-green-500 text-white"
              >
                Take the Quiz{" "}
              </button>
            </div>
            <div>
              {" "}
              <p className="text-[25px] font-bold font-Inter text-white">
                Overview
              </p>
              <p
                className="text-white"
                dangerouslySetInnerHTML={{
                  __html: `${requireData?.description}`,
                }}
              ></p>
              <div className="mt-4 text-[16px] font-semibold font-Inter ">
                <p className="text-white text-[18px] font-bold ">
                  Stories to read
                </p>
                <div className="flex flex-col mt-5">
                  {requireData?.requirements?.map((story, index) => {
                    return (
                      <button
                        onClick={() => {
                          sessionStorage.setItem("contentId", story.id);
                          navigate(
                            `../../parent/stories/sub/${story.slug
                              ?.toLocaleLowerCase()
                              .replace(/\s/g, "-")}`
                          );
                        }}
                        className="block  text-start py-2 text-blue-500"
                      >
                        {story?.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default PreviewSummerChallengePage;
