"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(status);
  console.log("Session data:", session);

  useEffect(() => {
    // Check if session is expired - could be indicated by empty user object or expires property
    const isSessionExpired =
      (status === "authenticated" && !session?.user?.email) ||
      (session?.expires && new Date(session.expires) <= new Date());

    if (isSessionExpired) {
      console.log("Session expired, redirecting to signin");
      router.push("/auth/signin");
      return;
    }

    if (status === "unauthenticated") {
      console.log("Not authenticated, redirecting to signin");
      router.push("/auth/signin");
    }
  }, [status, session, router]);

  if (status === "loading") return <div>Loading...</div>;

  return <>{children}</>;
}
