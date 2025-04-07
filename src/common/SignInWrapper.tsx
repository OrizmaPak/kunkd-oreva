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

      <div className=" top-0 h-full absolute grid grid-cols-2 w-full py-5 px-10 pl-[300px]">
        <div></div>
        <div className=" rounded-3xl flex items-center justify-center  overflow-hidden">
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
};

export default SignInWrapper;
