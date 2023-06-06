import NextIcon from "@/assets/nexticon.svg";
import PrevIcon from "@/assets/previcon.svg";

const Header = () => {
  return (
    <div className="flex justify-between px-10 py-4">
      <p className="font-bold font-Hanken">Assignments</p>
      <p className="gap-5 flex">
        <button>
          <img src={PrevIcon} alt="previous" />
        </button>
        <button>
          <img src={NextIcon} alt="Nexticon" />
        </button>
      </p>
    </div>
  );
};

export default Header;
