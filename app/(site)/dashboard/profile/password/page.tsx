import { auth } from "@/auth";
import SetPassword from "@/components/dashboard/profile/SetPassword";
import { redirect } from "next/navigation";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async (props: { searchParams: SearchParams }) => {
  const session = await auth();
  if (!session) redirect("/auth/signin?callbackUrl=dashboard/profile/password");

  const searchParams = await props.searchParams;
  const mode = searchParams.mode;
  return <SetPassword mode={mode as string | string[] | undefined} />;
};

export default page;
