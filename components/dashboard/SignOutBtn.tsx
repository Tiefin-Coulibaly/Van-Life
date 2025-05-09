import React from "react";
import clsx from "clsx";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signUserOUt } from "@/app/lib/actions/authActions";
import { revalidatePath } from "next/cache";

const SignOutBtn = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return (
    <form
      action={async () => {
        await signUserOUt();
      }}
    >
      <button
        type="submit"
        className={clsx(
          `hover:bg-sky-100 flex h-[48px] grow cursor-pointer items-center gap-2 rounded-md bg-gray-50 p-3 font-medium hover:text-blue-600 ${className}`,
        )}
      >
        <PowerIcon className="w-6" /> {text}
      </button>
    </form>
  );
};

export default SignOutBtn;
