import KundaKidsUnlimitedContent from './KundaKidsUnlimitedContent'
import GroupIcon from "@/assets/groupIcons.svg";

const KundaKidsUnlimited = () => {
  return (
    <div
        style={{
          backgroundImage: `url(${GroupIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="relative h-screen w-full flex justify-center items-top  "
      >
      <KundaKidsUnlimitedContent/>
    </div>
  )
}

export default KundaKidsUnlimited
