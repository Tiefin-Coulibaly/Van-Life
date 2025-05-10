import Heading1 from "@/components/headings/Heading1";
import VanCardSkeleton from "@/components/vans/VanCardSkeleton";
import { Suspense } from "react";
import VansList from "@/components/vans/VanList";
import VansFilter from "@/components/vans/VansFilter";
import { ISearchParams } from "@/types/searchParams";

const VansPage = async (props: { searchParams?: Promise<ISearchParams> }) => {
  const searchParams = await props.searchParams;

  return (
    <main className="pb-20 pt-50">
      <Heading1 title="Explore our van options" />

      <VansFilter />
      <section className=" grid  grid-cols-1 gap-6 py-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Suspense
          fallback={Array.from({ length: 20 }).map((_, index) => (
            <VanCardSkeleton key={index} />
          ))}
        >
          <VansList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
};

export default VansPage;

