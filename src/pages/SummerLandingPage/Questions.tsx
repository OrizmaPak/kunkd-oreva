import { Accordion } from "@mantine/core";
import { useState } from "react";
import GetInTouchImage from "@/assets/getintouchImage.png";
import Button from "@/components/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { Tabs } from "@mantine/core";
import "./Questions.css";
// import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

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
        <p className="font-medium md:py-4 font-Inter text1 "> {item.value}</p>
      </Accordion.Control>
      <Accordion.Panel className=" font-InterReg text2">
        {item.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <>
      <Tabs color="rgba(109, 3, 173, 1)" variant="pills" defaultValue="Faqs">
        <div className=" bg-[#6C08A9] md:py-10 py-4  pad-x-40 flex justify-center items-center gap-4 text30 px-10">
          <Tabs.List className=" bg-[#8530c1] p-4 rounded-3xl flex justify-center items-center md:gap-28">
            <Tabs.Tab
              value="Faqs"
              className="text25 font-bold rounded-3xl py-4 font-Inter w-full md:w-auto"
            >
              Frequently Asked Questions
            </Tabs.Tab>
            <Tabs.Tab
              value="Rulebook"
              className="text25 font-bold rounded-3xl py-4 font-Inter w-full md:w-auto"
            >
              Rulebook
            </Tabs.Tab>
          </Tabs.List>
        </div>

        <Tabs.Panel value="Faqs">
          <div>
            <div id="questions" className="bg-[#fafafc] pad-y-96 pad-x-40">
              <div className=" max-w-[1440px] mx-auto ">
                <p className="text1 text-center text-[#667085] font-medium font-InterReg">
                  Everything you need to know about how users can participate in
                  this competition
                </p>

                <div className="mt-14 max-w-[768px] mx-auto px-2">
                  <Accordion variant="contained" defaultValue="Apples">
                    {items}
                  </Accordion>
                </div>

                <div className="bg-[#F6F4F7] flex flex-col justify-center items-center  rounded-2xl gap-6 mt-14 p-3 py-8">
                  <img
                    src={GetInTouchImage}
                    alt="image"
                    className="w-[120px]"
                  />
                  <div>
                    <p className="text25 font-medium text-center">
                      Still have questions?
                    </p>
                    <p className="text1 text-center">
                      Please chat to our friendly team.
                    </p>
                  </div>
                  <Button size="sm">Get In touch</Button>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="Rulebook">
          <div className="pad-y-96 ">
            <div
              id="rulebook"
              className=" bg-[#FDFDFF]  pad-x-10  contain  bg-no-repeat  "
              //   style={{ backgroundImage: `url(${BackgroundBg})` }}
            >
              <div className="max-w-[1440px] mx-auto relative">
                <p className="header2 text-center text-black  font-medium max-w-[1000px] mx-auto px-2">
                  Here’s how to stack up points:
                </p>

                <ol className=" max-w-[800px] mx-auto list-decimal  text-[22px] mt-10 px-10 ">
                  <li className="my-5 text25 font-semibold">
                    Daily Reading
                    <br />
                    <p className="text1 text-[#434750] ">
                      5 points - reading the story/stories for the day
                    </p>
                  </li>
                  <li className="my-5 text25 font-semibold">
                    Quizzes:
                    <br />
                    <p className="text1 text-[#434750] ">
                      Base points for completing a quiz):
                    </p>
                    <ul className="text2  list-disc text-[#667085]">
                      <li>Easy (Week 1) - 5 points</li>
                      <li>Medium (Week 2) - 7 points</li>
                      <li>
                        Hard (Week 3) - 10 points (The tougher the quiz, the
                        higher your rewards)
                      </li>
                    </ul>
                  </li>
                  <li className="my-5 text25 font-semibold">
                    Daily Login Streak:
                    <p className="text1 text-[#434750] ">
                      (We would love to reward your consistency)
                    </p>
                    <ul className="text2  list-disc text-[#667085]">
                      <li className="my-3">
                        2 points - Login for 2 consecutive days
                      </li>
                      <li className="my-3">
                        3 points - Login for 3 consecutive days{" "}
                      </li>
                      <li className="my-3">
                        {" "}
                        4 points - Login for 4 consecutive days
                      </li>
                      <li className="my-3">
                        5 points - Login for 5 consecutive days{" "}
                      </li>
                      <li className="my-3">
                        6 points - Login for 6 consecutive days
                      </li>
                      <li className="my-3">
                        7 points - Login for 7 consecutive days
                      </li>
                    </ul>
                  </li>
                </ol>

                <div className=" flex flex-col md:flex-row gap-14 justify-center items-center mt-16  px-3"></div>
              </div>
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Questions;
