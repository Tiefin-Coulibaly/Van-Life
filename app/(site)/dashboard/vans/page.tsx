import UserVans from "@/components/dashboard/userVans/UserVans";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";

const page = async () => {

    const session = await auth();
  
    if (!session || !session.user) {
      redirect("/auth/signin?callbackUrl=/vans")
    }

    const userData = await fetchUserData(session.user.id as string);

  return (
    <UserVans vans={userData?.vansRented || []}/>
  )
}

export default page