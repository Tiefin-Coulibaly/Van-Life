"use client";

import { SessionProvider } from "next-auth/react";
import { UserDataProvider } from "@/components/context/userDataContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  return (
    <SessionProvider session={session}>
     
    <UserDataProvider>{children}</UserDataProvider>
     
    </SessionProvider>
  );
};

export default Provider;
