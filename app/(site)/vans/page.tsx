import Heading1 from "@/components/headings/Heading1";
import VanCardSkeleton from "@/components/vans/VanCardSkeleton";
import { Suspense } from "react";
import VansList from "@/components/vans/VanList";
import VansFilter from "@/components/vans/VansFilter";

const VansPage = () => {
  return (
    <main className="mt-30 ">
      <Heading1 title="Explore our van options" />

      <VansFilter/>
      <section className=" grid  grid-cols-1 gap-6 py-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Suspense
          fallback={Array.from({ length: 20 }).map((_, index) => (
            <VanCardSkeleton key={index} />
          ))}
        >
          <VansList />
        </Suspense>
      </section>
    </main>
  );
};

export default VansPage;


// TODO: handle the layout of the h1 on this page
// TODO: add filtering feature : ask chat gpt the best filtering feature to add for a new issue
// TODO: handle the vans detail page (for new issue)
