import { Accordion } from "@mantine/core";
import { useState } from "react";
import GetInTouchImage from "@/assets/getintouchImage.png";
import Button from "@/components/Button";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

const Questions = () => {
  const data = [
    {
      value: "Is there a free trial available?",
      description:
        "Yes, we allow every new user to consume three for our contents for free.",
    },
    {
      value: "How can i download the app",
      description:
        "You can download the app from either the Apple App Store or Google Play Store.",
    },
    {
      value: "How often is the app updated with new content?",
      description:
        "Yes, we allow every new user to consume three for our contents for free.",
    },
    {
      value: "How does the app ensure child safety?",
      description:
        "Yes, we allow every new user to consume three for our contents for free.",
    },
    {
      value: "Does the app offer progress tracking for parents?",
      description:
        "Yes, we allow every new user to consume three for our contents for free.",
    },
    {
      value: "Can the app be used in a classroom setting?",
      description:
        "Yes, we allow every new user to consume three for our contents for free.",
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
    <div className="bg-[#fafafc] pad-y-96 pad-x-40">
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
