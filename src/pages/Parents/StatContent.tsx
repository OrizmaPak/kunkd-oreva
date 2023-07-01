import Paren from "@/assets/paren.svg";
import Button from "@/components/Button";
const StatContent = () => {
  return (
    <div>
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-center text-[60px] font-Secondary mb-20">
          What is Kunda Kids for Parents
        </h1>
      </div>
      <div className="max-w-[1000px] mx-auto flex">
        <div className="basis-2/4">
          <img
            loading="lazy"
            src={Paren}
            alt="parentImage"
            className="w-[100%]"
          />
        </div>
        <div className="basis-2/4 pl-14">
          <p className="leading-7">
            Lorem ipsut incidunt repellat suscipit nam, amet excepturi alias
            magni quam porro molestias sint architecto debitis pariatur quas,
            rem omnis iusto minima? Eligendi magnam quidem cumque repellat iste.
            Architecto voluptates officiis quia nihil explicabo, voluptatem
            sapiente repudiandae ex alias placeat consequatur officia? Animi
            commodi nemo quos veniam. Necessitatibus nobis veritatis ducimus
            deserunt enim, aut eos deleniti corporis impedit quas commodi, hic
            delectus! Explicabo, iusto nulla commodi eum atque quisquam?
            <p className="mt-20">
              <Button size="sm">
                <small>Start FREE 7 Days Trial </small>
              </Button>
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatContent;
