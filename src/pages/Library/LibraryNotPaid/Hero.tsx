const Hero = ({ image }: { image: string }) => {
  return (
    <div className="">
      <img
        src={image}
        alt="banner "
        className=" h-[400px] rounded-t-[20px] w-full  object-cover"
      />
    </div>
  );
};

export default Hero;
