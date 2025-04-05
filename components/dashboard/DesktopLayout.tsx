import React from "react";
import Link from "next/link";
import { links } from "./NavLinks";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "next-auth/react";
import Image from "next/image";

/**
 * DesktopLayout Component
 *
 * This component provides a sidebar navigation menu designed for desktop layouts.
 * It displays a user dashboard with navigation links and a sign-out button.
 *
 * Features:
 * - Fixed sidebar for easy access to dashboard sections.
 * - Highlights the active link based on the current path.
 * - Responsive behavior: Visible only on large screens (`lg:block`).
 *
 * @returns {React.ReactElement} The desktop sidebar navigation layout.
 */
const DesktopLayout = (): React.ReactElement => {
  const pathName = usePathname();

  const { data: session } = useSession();


  return (
    <aside
      className={`fixed inset-y-0 left-0 top-28 z-99999 hidden w-64 bg-white p-6 shadow-md 
        md:translate-x-0 lg:relative lg:top-0 lg:block`}
    >
      {/* Dashboard Title (Hidden on Small Screens) */}
      <h2 className="hidden text-xl font-bold text-gray-900 md:block">
        Dashboard
      </h2>

      {/* Navigation Menu */}
      <nav className="mt-6 space-y-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hover:bg-sky-100 flex h-[48px] grow items-center gap-2 rounded-md bg-gray-50 p-3 font-medium hover:text-blue-600",
              {
                "bg-sky-100 text-blue-600": pathName === link.href, // Highlight active link
              },
            )}
          >
            {link.name === "Profile" && session?.user.image ? (
              <div className="relative size-8">
                <Image
                  alt="user's image"
                  src={session.user.image}
                  fill
                  className="rounded-full"
                />
              </div>
            ) : (
              link.icon
            )}{" "}
            {link.name}
          </Link>
        ))}

        {/* Sign Out Button */}
        <SignOutBtn text="Sign Out" className="!w-full" />
      </nav>
    </aside>
  );
};

export default DesktopLayout;
