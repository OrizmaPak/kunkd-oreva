import Button from "@/components/Button";

const Question = () => {
  return (
    <div className="text-white bg-[#8530C1] p-16 text-center mt-40 mb-10  ">
      <div>
        <h1 className="text-[36px] font-Inter header2   font-semibold mb-4">
          Have a question? <br /> Our team is happy to assist you.
        </h1>
        <p className="mb-5 text1 font-InterReg">
          Ask about Kunda Kids products, pricing, implementation or anything
          else. Our highly <br /> trained reps are standing by. ready to help.
        </p>
        <Button size="md" className="mt-5 bg-white p-5 rounded px-16">
          <span className=" text-[#8530C1] font-Inter">Contact Us</span>
        </Button>
      </div>
    </div>
  );
};

export default Question;
