import PasswordReset from "@/components/Auth/passwordReset/PasswordReset";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const metadata = {
    title: "Reset Your Password | Van Life",
    description: "Securely reset your account password. Enter your new password to regain access to your account.",
  };

const page = async(props:{searchParams:SearchParams}) => {
  const searchParams = await props.searchParams;
  const email = searchParams.email;

  return <PasswordReset email={email as string}/>;
};

export default page;
