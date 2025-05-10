"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimationWrapper from "@/components/animationWrapper/AnimationWrapper";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <section className="overflow-hidden pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      {/* Hero Section */}
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="relative z-1 md:flex md:items-center md:justify-between md:gap-10">
          <AnimationWrapper
            className="relative z-1 mb-12 md:mb-0 md:w-1/2 lg:w-5/12"
            delay={0.1}
          >
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Our Journey to Transform Van Travel
            </h1>
            <p className="text-body-color text-base md:text-lg">
              We're passionate about freedom, adventure, and the open road. Van
              Life began with a simple idea: make memorable road trips
              accessible to everyone.
            </p>
          </AnimationWrapper>

          <AnimationWrapper
            className="relative mx-auto md:w-1/2 lg:w-7/12"
            delay={0.1}
          >
            <div className="relative h-[400px] md:right-0 md:h-[500px]">
              <Image
                src="/images/about/about-hero.jpg"
                alt="About Van Life"
                fill
                className="rounded-lg object-cover"
                quality={100}
              />
            </div>
          </AnimationWrapper>
        </div>
      </div>

      {/* Mission and Values */}
      <div className="mx-auto mt-20 max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <AnimationWrapper className="mx-auto text-center" delay={0.1}>
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
            Our Mission & Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Freedom */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection">
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Freedom
              </h3>
              <p className="text-body-color text-base">
                We believe in the transformative power of unrestricted travel,
                where every road leads to new discoveries and experiences.
              </p>
            </div>

            {/* Community */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection">
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Community
              </h3>
              <p className="text-body-color text-base">
                We foster a community of like-minded travelers who share
                stories, tips, and the common joy of van life experiences.
              </p>
            </div>

            {/* Sustainability */}
            <div className="rounded-lg bg-white p-8 shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection">
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Sustainability
              </h3>
              <p className="text-body-color text-base">
                We're committed to promoting responsible travel practices that
                minimize environmental impact while maximizing authentic
                experiences.
              </p>
            </div>
          </div>
        </AnimationWrapper>
      </div>

      {/* Our Story */}
      <div className="mx-auto mt-20 max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
          <AnimationWrapper className="md:w-1/2" delay={0.1}>
            <div className="relative h-[350px] w-full md:h-[440px]">
              <Image
                src="/images/about/travellers.jpg" 
                alt="Our story"
                fill
                className="rounded-lg object-cover"
                quality={100}
              />
            </div>
          </AnimationWrapper>

          <AnimationWrapper className="md:w-1/2" delay={0.1}>
            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Our Story
            </h2>
            <p className="text-body-color mb-5 text-base">
              Van Life began in 2022 when a group of travel enthusiasts realized
              there was a gap in the market for high-quality, accessible van
              rentals. After countless road trips and adventures in run-down
              rentals, we knew there had to be a better way.
            </p>
            <p className="text-body-color mb-8 text-base">
              We started with just three vans and a passion for the open road.
              Today, we've grown into a community of over 500 vans across
              the country and abroad.
            </p>
            <p className="text-body-color text-base">
              Our mission remains simple: provide exceptional vans and excellent
              service to help people create unforgettable memories on the road.
            </p>
          </AnimationWrapper>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="mx-auto mt-20 max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <AnimationWrapper className="mx-auto text-center" delay={0.1}>
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
            Meet Our Team
          </h2>
          <p className="text-body-color mx-auto mb-12 max-w-[800px] text-base lg:text-lg">
            Our dedicated team brings together expertise in travel, automotive
            knowledge, and customer service to deliver the best van rental
            experience.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Team Member 1 */}
            <div className="group">
              <div className="relative h-[320px] overflow-hidden rounded-lg">
                <Image
                  src="/images/about/ceo.jpg" 
                  alt="Team Member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h4 className="text-xl font-semibold text-white">
                    Alex Thompson
                  </h4>
                  <p className="text-sm text-gray-300">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="relative h-[320px] overflow-hidden rounded-lg">
                <Image
                  src="/images/about/director.jpg" // Replace with actual image
                  alt="Team Member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h4 className="text-xl font-semibold text-white">
                    Sarah Chen
                  </h4>
                  <p className="text-sm text-gray-300">Operations Director</p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group">
              <div className="relative h-[320px] overflow-hidden rounded-lg">
                <Image
                  src="/images/about/manager.jpg" 
                  alt="Team Member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h4 className="text-xl font-semibold text-white">
                    Marcus Williams
                  </h4>
                  <p className="text-sm text-gray-300">Fleet Manager</p>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="group">
              <div className="relative h-[320px] overflow-hidden rounded-lg">
                <Image
                  src="/images/about/cutomer-experience.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h4 className="text-xl font-semibold text-white">
                    Olivia Rodriguez
                  </h4>
                  <p className="text-sm text-gray-300">Customer Experience</p>
                </div>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </div>

      {/* Join Our Journey */}
      <div className="mx-auto mt-20 max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <AnimationWrapper
          className="rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent md:px-12.5 xl:px-17.5"
          delay={0.1}
        >
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            <div className="md:w-[70%] lg:w-1/2">
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
                Join Our Growing Van Life Community
              </h2>
              <p>
                Whether you're looking to rent a van for your next adventure or
                have a van you'd like to share with others, we'd love to have
                you join our community.
              </p>
            </div>
            <div className="flex items-center md:w-[30%] md:justify-end lg:w-[45%]">
              <Link
                href="/vans"
                className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
              >
                Explore Vans
                <svg
                  className="fill-white dark:fill-black"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z" />
                </svg>
              </Link>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
};

export default AboutUs;
