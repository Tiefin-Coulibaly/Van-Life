import PasswordReset from "@/components/Auth/passwordReset/PasswordReset";

export const metadata = {
    title: "Reset Your Password | #VanLife",
    description: "Securely reset your account password. Enter your new password to regain access to your account.",
  };

const page = () => {
  return <PasswordReset />;
};

export default page;
