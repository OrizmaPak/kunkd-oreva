const TopLeaderboardModal = () => {
  return (
    <div className="p-4">
      <p className="font-Inter text30">
        {" "}
        How to stay on top of the leaderboard!
      </p>
      <p>
        <ul className=" list-disc pl-8">
          <li className="my-4 text1 font-InterReg">
            <strong> Be a Daily Reader:</strong> Read the assigned stories for
            the challenge every day! This earns you 5 points a day.
          </li>
          <li className="my-4 text1 font-InterReg">
            <strong> Master the Quizzes:</strong> Difficulty brings rewards!
            Challenge yourself and keep reading. Quizzes get more difficult as
            the challenge progresses.
          </li>
          <li className="my-4 text1 font-InterReg">
            <strong> Bonus Tip:</strong> Consistency is key! Log in daily,
            complete your reading tasks, and ace the quizzes to rack up points
            and climb the leaderboard!"
          </li>
        </ul>
        <p>
          Remember: Consistency is key! Read, quiz, and log in every day to
          maximize your points and climb the leaderboard.
        </p>
      </p>
    </div>
  );
};

export default TopLeaderboardModal;
