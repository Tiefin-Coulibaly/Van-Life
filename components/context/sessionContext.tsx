"use client";

import { SessionProvider } from "next-auth/react";
import LoginContextProvider from "./loginContext";

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  return (
    <SessionProvider session={session}>
      <LoginContextProvider>{children}</LoginContextProvider>
    </SessionProvider>
  );
};

export default Provider;
