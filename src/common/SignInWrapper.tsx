import BgImage from "@/assets/newBackground.svg";

type Props = {
  children: React.ReactNode;
};
const SignInWrapper = ({ children }: Props) => {
  return (
    <div className="w-full h-[100vh] relative ">
      <img
        src={BgImage}
        alt="signin image"
        className=" w-full h-full object-cover object-center "
      />

      <div className=" top-0 h-full absolute flex w-full py-5 px-20  ">
        <div className=" rounded-3xl w-[50%] flex-grow  flex items-center   justify-end    overflow-hidden">
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
};

export default SignInWrapper;
