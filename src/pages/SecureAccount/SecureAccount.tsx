import ParentSignupLayout from "@/common/ParentSignupLayout";
import SecureAccountContent from "@/pages/SecureAccount/SecureAccountContent";

const SecureAccount = () => {
  return (
    <ParentSignupLayout active={1}>
      <SecureAccountContent />
    </ParentSignupLayout>
  );
};

export default SecureAccount;
