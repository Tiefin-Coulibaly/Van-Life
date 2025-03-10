import { Types } from "mongoose";
import { fetchVanById } from "@/app/lib/data/vansData";
import VanDetails from "@/components/vanDetails/VanDetails";

const page = async (props: { params: Promise<{ id: Types.ObjectId }> }) => {
  const params = await props.params;
  const id = params.id;
  const van = await fetchVanById(id);
  console.log(van);

  return (
    <main className="mt-30">
      {van && <VanDetails
        name={van.name}
        price={van.price}
        description={van.description}
        images={van.images}
        type={van.type}
        location={van.location}
        rating={van.rating}
        features={van.features}
        available={van.available}
      />}
    </main>
  );
};

export default page;
