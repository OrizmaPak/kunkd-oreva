import Wrapper from "../../common/User/Wrapper";
import InnerWrapper from "../../common/User/InnerWrapper";
import Header from "./Header";
import AdsButton from "../../common/User/AdsButton";
import EmptyList from "./EmptyList";
import { data } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import DataList from "./DataList";

const MyList = () => {
  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Header />
          {/* <EmptyList /> */}
          <DataList data={data} />
          <div className="pb-14">
            <AdsButton />
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default MyList;
