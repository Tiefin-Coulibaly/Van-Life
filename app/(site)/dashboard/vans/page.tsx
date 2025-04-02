import UserVans from "@/components/dashboard/userVans/UserVans";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    // get the session
    const session = await auth();
  
    // protect the route by redirecting the user to the 
    // log in page
    if (!session || !session.user) {
      redirect("/auth/signin?callbackUrl=/vans")
    }

  return (
    <UserVans/>
  )
}

export default page