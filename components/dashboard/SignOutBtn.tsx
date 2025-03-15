import React from "react";
import clsx from "clsx";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const SignOutBtn = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className={clsx(
        `hover:bg-sky-100 flex h-[48px] grow cursor-pointer items-center gap-2 rounded-md bg-gray-50 p-3 font-medium hover:text-blue-600 ${className}`,
      )}
    >
      <PowerIcon className="w-6" /> {text}
    </button>
  );
};

export default SignOutBtn;
