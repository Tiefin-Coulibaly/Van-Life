import { VanListProp } from "@/types/vanListProp";
import VanCard from "./VanCard";
import { fetchAllVans, fetchVansFilter } from "@/app/lib/data/vansData";

const VansList = async ({types}:VanListProp) => {
    const vans = await fetchAllVans();
    const vansFiltered = await fetchVansFilter(types)

    
  
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