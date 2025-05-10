"use client";

import Image from "next/image";
import SignInForm from "./SignInForm";
import GoogleSignIn from "./GoogleSignIn";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { googleErrorMessage } from "@/app/lib/utils/googleErrorMessage";
import { useLoginContext } from "@/components/context/loginContext";
import AnimationWrapper from "@/components/animationWrapper/AnimationWrapper";

const Signin = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useLoginContext();
  const [signInError, setSignInError] = useState<string>("");

  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const errorType = params.get("error");

  // Force a refresh when component mounts to ensure animations play
  useEffect(() => {
    router.refresh();
  }, [router]);

  // Handle authentication errors from Google
  useEffect(() => {
    if (errorType) {
      setSignInError(googleErrorMessage(errorType as string));
      setIsLoggedIn(false);
    }
  }, [errorType, setIsLoggedIn]);

  return (
    <>
      {/* Sign In Form Container */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          {/* Background decorative elements */}
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          {/* Animated form card using AnimationWrapper */}
          <AnimationWrapper
            className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
            delay={0.1}
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Login to Your Account
            </h2>

            {/* Google OAuth authentication component */}
            <GoogleSignIn />

            {/* Google Authentication error display */}
            {signInError && (
              <div className="mb-5 rounded bg-red-100 p-3 text-center text-red-700">
                {signInError}
              </div>
            )}

            {/* Divider between authentication methods */}
            <div className="mb-10 flex items-center justify-center">
              <span className="dark:bg-stroke-dark hidden h-[1px] w-full max-w-[200px] bg-stroke dark:bg-strokedark sm:block"></span>
              <p className="text-body-color dark:text-body-color-dark w-full px-5 text-center text-base">
                Or, login with your email
              </p>
              <span className="dark:bg-stroke-dark hidden h-[1px] w-full max-w-[200px] bg-stroke dark:bg-strokedark sm:block"></span>
            </div>

            {/* Email/password authentication form */}
            <SignInForm callbackUrl={callbackUrl} />
          </AnimationWrapper>
        </div>
      </section>
    </>
  );
};

export default Signin;