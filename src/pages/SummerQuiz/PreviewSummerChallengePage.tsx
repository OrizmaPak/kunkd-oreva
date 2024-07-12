import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { useGetSummerChallengeQuizzes } from "@/api/queries";
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
  const { data: data } = useGetSummerChallengeQuizzes();
  const quizzes = data?.data?.data?.quizzes;
  const quizId = sessionStorage.getItem("summerQuizId");

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

  const selectedQuiz = findObjectById(quizzes);
  console.log("The Selected Quiz", selectedQuiz);
  const navigate = useNavigate();
  return (
    <div>
      <Wrapper bgColor="white">
        <InnerWrapper>
          <div className="grid grid-cols-2 mt-20 ">
            <div>
              <p className="text-[25px] font-Inter font-bold flex-grow-1 mb-10">
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
              <p className="text-[25px] font-bold font-Inter">Description</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${selectedQuiz?.description}`,
                }}
              ></p>
              <div className="mt-4 text-[16px] font-semibold font-Inter ">
                <p>Read the stories below before taking the quiz</p>
                <div className=" ">
                  <button className="block my-3">Story One</button>
                  <button className="block my-3">Story Two</button>
                  <button className="block my-3">Story Three</button>
                  <button className="block my-3">Story Four</button>
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
