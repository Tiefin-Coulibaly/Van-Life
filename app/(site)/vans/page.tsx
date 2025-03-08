import Heading1 from "@/components/headings/Heading1";
import VanCardSkeleton from "@/components/vans/VanCardSkeleton";
import { Suspense } from "react";
import VansList from "@/components/vans/VanList";

const VansPage = () => {
  return (
    <main className="mt-30">
      <Heading1 title="Explore our van options" />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
