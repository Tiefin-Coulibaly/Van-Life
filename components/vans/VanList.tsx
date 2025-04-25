import { VanListProp } from "@/types/vanListProp";
import VanCard from "./VanCard";
import { fetchAllVans, fetchVansFilter } from "@/app/lib/actions/vanActions";
import { ISearchParams } from "@/types/searchParams";
import Link from "next/link";
import { Type, Van } from "@prisma/client";

const VansList = async (props: { searchParams?: ISearchParams }) => {
  let vans: Van[] | any[];
  if (Object.keys(props.searchParams ?? {}).length > 0) {
    vans = await fetchVansFilter(props.searchParams!);
  } else vans = await fetchAllVans();

  console.log("searchParams", props.searchParams);

  return (
    <>
      {vans.map((van: Van) => (
        <Link href={`/vans/${van.id}`}>
          <VanCard
          key={van.id.toString()}
          id={van.id}
          name={van.name as string}
          price={van.price}
          image={van.images[0]}
          city = {van.city}
          country= {van.country }
          type={van.type as Type}
          rating={van.rating ?? 0}
        /></Link>
      ))}
    </>
  );
};

export default VansList;
