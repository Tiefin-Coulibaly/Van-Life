import VanCard from "./VanCard";
import { fetchAllVans } from "@/app/lib/data/data";

const VansList = async () => {
    const vans = await fetchAllVans();
  
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