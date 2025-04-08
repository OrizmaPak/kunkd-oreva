import SignInImage from "@/assets/signInImage (2).png";
type Props = {
  children: React.ReactNode;
};
const SignInWrapper = ({ children }: Props) => {
  return (
    <div className="w-full h-[100vh] relative ">
      <img
        src={SignInImage}
        alt="signin image"
        className=" w-full h-full object-cover object-top "
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
