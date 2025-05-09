"use client";

import React from "react";
import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { links } from "./NavLinks";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "next-auth/react";
import Image from "next/image";

const MobileAndTabletLayout = (): React.ReactElement => {
 
  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <section className="my-4 bg-white p-2 shadow shadow-md md:p-4 lg:hidden">
      <nav className="flex flex-wrap items-center justify-center gap-2">
        {/* Render navigation links dynamically */}
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hover:bg-sky-100 flex gap-2 h-[48px] grow items-center justify-center rounded-md bg-gray-50 p-3 font-medium hover:text-blue-600",
              {
                "bg-sky-100 text-blue-600": pathName === link.href, 
              },
            )}
          >
            {link.name === "Profile" && session?.user.image ? (
              <div className="relative h-8 w-8">
                <Image
                  alt="user's image"
                  src={session.user.image}
                  fill
                  className="rounded-full object-cover shadow-md"
                />
              </div>
            ) : (
              link.icon
            )}{" "}
            {link.name}
          </Link>
        ))}

        {/* Sign Out Button */}
        <SignOutBtn text="" className="!justify-center" />
      </nav>
    </section>
  );
};

export default MobileAndTabletLayout;
