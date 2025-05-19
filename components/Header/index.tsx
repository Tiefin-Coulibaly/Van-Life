"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import menuData from "./menuData";
import { signUserOUt } from "@/app/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/components/context/loginContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router, session, status]);

  const toggleNavigation = () => {
    if (navigationOpen) {
      setIsMenuAnimating(true);

      setNavigationOpen(false);

      setTimeout(() => {
        setIsMenuAnimating(false);
      }, 300);
    } else {
      setNavigationOpen(true);
      setIsMenuAnimating(true);
    }
  };

  const pathUrl = usePathname();

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  const handleSignOut = async () => {
    setUserDropdown(false);
    await signUserOUt();
    setIsLoggedIn(false);
    window.location.href = "/auth/signin";
  };

  const handleMenuItemClick = () => {
    if (navigationOpen) {
      toggleNavigation();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  const getUserDisplayName = (user) => {
    if (!user) return null;
    
    if (user.name) return user.name;
    
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName;
  };

  return (
    <header
      className={`container fixed inset-x-0 top-0 z-999 mx-auto py-7 ${
        stickyMenu
          ? "bg-white !py-4 transition duration-100 dark:bg-black"
          : "bg-white"
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 lg:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between lg:w-1/4">
          <a href="/">
            <div className="relative h-24 w-24 lg:h-28 lg:w-28">
              <Image
                src="/images/logo/company-logo_svg.png"
                alt="logo"
                fill
                className="w-full"
              />
            </div>
          </a>

          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block lg:hidden"
            onClick={toggleNavigation}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 !w-full" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        {/* Nav Menu Start */}
        <div
          className={`lg:visible lg:flex lg:h-auto lg:w-full
            ${
              navigationOpen || isMenuAnimating
                ? "navbar visible transition-all duration-300 ease-in-out"
                : "invisible h-0"
            }
            ${
              navigationOpen
                ? "mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 opacity-100 shadow-solid-5 dark:bg-blacksection"
                : "max-h-0 opacity-0"
            }
            lg:h-auto lg:max-h-full lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent`}
        >
          {/* Center the navigation menu */}
          <nav className="lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      <ul
                        className={`dropdown ${dropdownToggler ? "flex" : ""}`}
                      >
                        {menuItem.submenu.map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link
                              href={item.path || "#"}
                              onClick={handleMenuItemClick} // Close mobile menu on link click
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? "text-primary hover:text-primary"
                          : "hover:text-primary"
                      }
                      onClick={handleMenuItemClick}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 lg:mt-0 z-999">
            {session ? (
              // User is signed in - show profile
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 rounded-lg hover:text-primary"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-full w-full text-gray-400" />
                    )}
                  </div>
                  <span className="hidden text-sm font-medium md:block">
                    {getUserDisplayName(session?.user) || ""}
                  </span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* User dropdown menu - Fixed positioning for mobile */}
                {userDropdown && (
                  <div className="absolute -right-40 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-blacksection md:-right-30 xs:-right-30">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      onClick={() => {
                        setUserDropdown(false);
                        handleMenuItemClick(); 
                      }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      onClick={() => {
                        setUserDropdown(false);
                        handleMenuItemClick(); 
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        handleMenuItemClick(); 
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not signed in - show sign in/up buttons
              <div className="flex items-center gap-6">
                <Link
                  href="/auth/signin"
                  onClick={handleMenuItemClick}
                  className="text-regular font-medium text-waterloo hover:text-primary"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={handleMenuItemClick}
                  className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;