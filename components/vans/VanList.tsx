import { VanListProp } from "@/types/vanListProp";
import VanCard from "./VanCard";
import { fetchAllVans, fetchVansFilter } from "@/app/lib/data/vansData";
import { ISearchParams } from "@/types/searchParams";

const VansList = async (props:{searchParams?:ISearchParams}) => {
    const vans = await fetchAllVans();
    if (Object.keys(props.searchParams ?? {}).length > 0) {
        // const vansFiltered = await fetchVansFilter(props.searchParams)
    }
    


  
    return (
      <>
        {vans.map((van) => (
          <VanCard
            key={van._id.toString()}
            name={van.name}
            price={van.price}
            image={van.images[0]}
            location={{ city: van.location.city, country: van.location.country }}
            type={van.type}
            rating={van.rating ?? 0}
          />
        ))}
      </>
    );
  };

  export default VansList