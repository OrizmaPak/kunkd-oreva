import { Accordion } from "@mantine/core";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { Tabs } from "@mantine/core";
import "./Questions.css";
import CurveArrow01 from "@/assets/curveArrow01.png";
import CurveArrow02 from "@/assets/curveArrow02.png";
import ContactImage from "@/assets/getintouchImage.png";

const Questions = () => {
  const emailAddress = "Support@kundakids.com";

  const mailtoLink = `mailto:${emailAddress}`;

  const data = [
    {
      value: "How do I participate in the daily quizzes?",
      description:
        "Every day at 12 noon (GMT+1), a new quiz will be uploaded on the app. Log in and take the quiz to test your knowledge and earn points!",
    },
    // {
    //   value: "What happens after the challenge?",
    //   description:
    //     "Celebrate your achievements and keep reading! We'll continue to offer engaging content to fuel your child's love for learning.",
    // },
    {
      value: "How do I stay on top of the leaderboard?",
      description: (
        <>
          <p className="text20 font-InterReg">
            The leaderboard shows the top earners each week. Here are 2 ways to
            climb the ranks:
          </p>
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
      <div className="relative">
        <img
          src={CurveArrow01}
          alt="image"
          className="absolute right-[10%] hidden md:block"
        />
        <img
          src={CurveArrow02}
          alt="image"
          className="absolute top-[50%] left-[10%] z-50 hidden md:block"
        />

        <Tabs color="rgba(109, 3, 173, 1)" variant="pills" defaultValue="Faqs">
          <div
            id="questions"
            className="  md:py-10 py-4  pad-x-40 flex justify-center items-center gap-4 text30 px-10"
          >
            <Tabs.List className=" bg-[#8530c1] p-4 rounded-3xl flex md:grid grid-cols-2 justify-center items-center  md:gap-60">
              <Tabs.Tab
                value="Faqs"
                className="text25 font-bold rounded-3xl py-4 font-Inter w-full "
              >
                Frequently Asked Questions
              </Tabs.Tab>
              <Tabs.Tab
                value="Rulebook"
                className="text25 font-bold rounded-3xl py-4 font-Inter w-full   "
              >
                Rulebook
              </Tabs.Tab>
            </Tabs.List>
          </div>

          <Tabs.Panel value="Faqs">
            <div>
              <div className=" pad-x-40 mt-3 md:my-8 ">
                <div className=" max-w-[1440px] mx-auto ">
                  {/* <p className="text25 text-center  font-semibold font-InterReg">
                    Everything you need to know about how users can participate
                    in this competition
                  </p> */}

                  <div className="mt-4 max-w-[1000px] mx-auto px-2">
                    <Accordion variant="contained" defaultValue="Apples">
                      {items}
                    </Accordion>
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-[32px] bg-[#F6F4F7] justify-center max-w-[1440px] mx-auto  mt-16 rounded-[16px]">
                  <div className="flex justify-center items-center">
                    <img src={ContactImage} alt="image" className="w-[120px]" />
                  </div>
                  <p className="text20 font-Inter text-center ">
                    {" "}
                    Still have questions?
                  </p>
                  <p className="text1 font-InterReg text-center">
                    Can’t find the answer you’re looking for? Please chat with
                    our friendly team.
                  </p>
                  <div className="flex justify-center mt-3">
                    <a
                      href={mailtoLink}
                      className=" font-Inter text-white inline bg-[#8530C1] py-2 px-3 rounded hover:text-white hover:no-underline"
                    >
                      Get in touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="Rulebook">
            <div className=" ">
              <div id="rulebook" className="   pad-x-10  mt-3 md:my-8 ">
                <div className="max-w-[1440px] mx-auto relative">
                  <p className="text25 text-center text-black  font-medium max-w-[1000px] mx-auto px-2">
                    Here’s how to stack up points:
                  </p>

                  <ol className=" max-w-[800px] mx-auto list-decimal  text-[22px] mt-5 px-10 ">
                    <li className="my-5 text25  font-Inter">
                      Daily Reading
                      <br />
                      <p className="text1 text-[#434750] font-InterReg ">
                        5 points - reading the story/stories for the day
                      </p>
                    </li>
                    <li className="my-5 text25 font-Inter">
                      Quizzes:
                      <br />
                      <p className="text1 text-[#434750] font-InterReg">
                        Base points for completing a quiz):
                      </p>
                      <ul className="text2 list-disc text-[#667085]">
                        <li className="flex gap-1 items-center text1 font-InterReg">
                          Easy (Week 1) - 5 points
                        </li>
                        <li className="flex gap-1 items-center text1 font-InterReg">
                          Medium (Week 2) - 7 points
                        </li>
                        <li className="flex gap-1 items-center text1 font-InterReg">
                          Hard (Week 3) - 10 points (The tougher the quiz, the
                          higher your rewards)
                        </li>
                      </ul>
                    </li>
                    <li className="my-5 text25 font-Inter">
                      Daily Login Streak:
                      <p className="text1 text-[#434750] font-InterReg ">
                        (We would love to reward your consistency)
                      </p>
                      <ul className="text2 list-disc  text-[#667085]">
                        <li className="my-3 flex gap-1 items-center font-InterReg">
                          2 points - Login for 2 consecutive days
                        </li>
                        <li className="my-3 flex gap-1 items-center font-InterReg">
                          3 points - Login for 3 consecutive days{" "}
                        </li>
                        <li className="my-3 flex gap-1 items-center font-InterReg">
                          4 points - Login for 4 consecutive days
                        </li>
                        <li className="my-3 flex gap-1 items-center font-InterReg">
                          5 points - Login for 5 consecutive days{" "}
                        </li>
                        <li className="my-3 flex gap-1 items-center font-InterReg">
                          6 points - Login for 6 consecutive days
                        </li>
                        <li className="my-3 flex gap-1 items-center font-InterReg">
                          7 points - Login for 7 consecutive days
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Questions;
