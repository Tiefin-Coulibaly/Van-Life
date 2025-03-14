import Link from "next/link";
import { signUserIn } from "@/app/lib/actions";

const SignInForm = () => {
  return (
    <form  action={signUserIn}>
      <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
        />
      </div>

      <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
        <div className="flex flex-wrap gap-4 md:gap-10">
          <div className="mb-4 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              className="peer sr-only"
            />
            <span className="group mt-1 flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-gray-100 text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
              <svg
                className="opacity-0 peer-checked:group-[]:opacity-100"
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                  fill="white"
                />
              </svg>
            </span>
            <label
              htmlFor="default-checkbox"
              className="flex max-w-[425px] cursor-pointer select-none pl-3"
            >
              Keep me signed in
            </label>
          </div>

          <a href="#" className="hover:text-primary">
            Forgot Password?
          </a>
        </div>

        <button
          aria-label="login with email and password"
          className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
        >
          Log in
          <svg
            className="fill-white"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
        <p>
          Don't have an account?{" "}
          <Link
            className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
            href="/auth/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
