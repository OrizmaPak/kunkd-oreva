import { Accordion } from "@mantine/core";
import { useState } from "react";
import GetInTouchImage from "@/assets/getintouchImage.png";
import Button from "@/components/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

const Questions = () => {
  const data = [
    {
      value: "How do I participate in the daily quizzes?",
      description:
        "Every week, we'll upload new subcategories of stories. Each day at 12:00 noon WAT, a quiz based on these stories will be available on the Kunda Kids app. Log in and take the quiz to test your knowledge and earn points!",
    },
    {
      value: "What happens after the challenge?",
      description:
        "Celebrate your achievements and keep reading! We'll continue to offer engaging content to fuel your child's love for learning.",
    },
    {
      value: "How do I stay on top of the leaderboard?",
      description: (
        <>
          The leaderboard shows the top earners each week. Here are 2 ways to
          climb the ranks :
          <ul className=" list-disc pl-8">
            <li>
              <strong> Be a Daily Reader:</strong> Read the assigned stories for
              the challenge every day! This earns you 5 points a day.
            </li>
            <li>
              <strong> Master the Quizzes:</strong> Difficulty brings rewards!
              Challenge yourself with medium and hard quizzes (worth 7 and 10
              points each) and aim for high scores by answering correctly (bonus
              points per question).
            </li>
            <li>
              {" "}
              <strong> Bonus Tip:</strong> Consistency is key! Log in daily,
              complete your reading tasks, and ace the quizzes to rack up points
              and climb the leaderboard!"
            </li>
          </ul>
        </>
      ),
    },
  ];

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // Function to toggle the open/close state of a specific item
  const toggleItem = (value: string) => {
    setOpenItems((prevOpenItems) => {
      // Create a new object with all keys set to false
      const updatedOpenItems: { [key: string]: boolean } = {};
      Object.keys(prevOpenItems).forEach((key) => {
        updatedOpenItems[key] = false;
      });
      // Toggle the specific item's state
      updatedOpenItems[value] = !prevOpenItems[value];
      return updatedOpenItems;
    });
  };
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control
        onClick={() => toggleItem(item.value)}
        // classNames={{ chevron: classes.chevron }}
        chevron={
          openItems[item.value] ? (
            <FiMinusCircle size={23} color="#8530C1" />
          ) : (
            <FiPlusCircle size={23} color="#8530C1" />
          )
        }
      >
        <p className="font-medium md:py-4"> {item.value}</p>
      </Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <div id="questions" className="bg-[#fafafc] pad-y-96 pad-x-40">
      <div className=" max-w-[1440px] mx-auto ">
        <p className="text30 font-medium text-center">
          Frequently asked questions
        </p>
        <p className="text1 text-center text-[#667085] font-medium">
          Everything you need to know about how users can participate in this
          competition
        </p>

        <div className="mt-14 max-w-[768px] mx-auto px-2">
          <Accordion variant="contained" defaultValue="Apples">
            {items}
          </Accordion>
        </div>

        <div className="bg-[#F6F4F7] flex flex-col justify-center items-center  rounded-2xl gap-6 mt-14 p-3 py-8">
          <img src={GetInTouchImage} alt="image" className="w-[120px]" />
          <div>
            <p className="text25 font-medium text-center">
              Still have questions?
            </p>
            <p className="text1 text-center">
              Can’t find the answer you’re looking for? Please chat to our
              friendly team.
            </p>
          </div>
          <Button size="sm">Get In touch</Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
