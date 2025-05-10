"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
const router = useRouter();

  return (
    <>
      <section className="overflow-hidden pb-20 pt-40 md:pt-40 md:pb-5 xl:pb-5 xl:pt-46 ">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center ">
            <div className=" md:w-1/2">
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                You got the travel plans, we got the travel {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  vans
                </span>
              </h1>
              <p>
                Add adventure to your life by joining the #vanlife movement.
                Rent the perfect van to make your perfect road trip.
              </p>

              <div className="mt-10">
                <button
                  aria-label="get started button"
                  onClick={() => router.push("/vans")}
                  className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="animate_right hidden md:block md:w-1/2">
              <div className="relative h-[70vh]  w-full 2xl:-mr-7.5">
                <Image
                  src="/images/hero/heroImage1.jpg"
                  alt="Van life hero"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
