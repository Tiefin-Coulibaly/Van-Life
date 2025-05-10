"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import SignupForm from "./SignupForm";
import GoogleSignIn from "../signin/GoogleSignIn";
import AnimationWrapper from "@/components/animationWrapper/AnimationWrapper";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  
  return (
    <>
      {/* ===== Signup Form Section Start ===== */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          {/* Background gradient effect for aesthetic design */}
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>

          {/* Dotted pattern images for additional design elements */}
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

          {/* AnimationWrapper for fade-in animation effect */}
          <AnimationWrapper
            className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
            delay={0.1}
          >
            {/* Signup Form Heading */}
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Create an Account
            </h2>

            {/* Google Third-Party Authentication  */}
            <GoogleSignIn />

            {/* OR Divider */}
            <div className="mb-10 flex items-center justify-center">
              <span className="dark:bg-stroke-dark hidden h-[1px] w-full max-w-[200px] bg-stroke dark:bg-strokedark sm:block"></span>
              <p className="text-body-color dark:text-body-color-dark w-full px-5 text-center text-base">
                Or, register with your email
              </p>
              <span className="dark:bg-stroke-dark hidden h-[1px] w-full max-w-[200px] bg-stroke dark:bg-strokedark sm:block"></span>
            </div>

            {/* Email/Password Signup Form */}
            <SignupForm />
          </AnimationWrapper>
        </div>
      </section>
      {/* ===== Signup Form Section End ===== */}
    </>
  );
};

export default Signup;