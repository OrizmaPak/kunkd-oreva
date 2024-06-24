import image404 from "@/assets/error404.svg";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
const PageInProduction = () => {
  const navigate = useNavigate();
  return (
    <div className="px-3">
      <p className="header2 font-bold text-center mt-8">Nothing to see here</p>
      <p className="text20 mt-4">
        Please be informed that this page is currently optimized for mobile
        devices. For the best viewing experience, we recommend accessing it on a
        desktop or tablet. Thank you for your cooperation and understanding
      </p>
      <div className="flex justify-center items-center mt-3 flex-col px-8 gap-4">
        <img src={image404} alt="image" className="w-[200px]" />
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </div>
  );
};

export default PageInProduction;
