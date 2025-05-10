import { fetchVanById } from "@/app/lib/actions/vanActions";
import VanDetails from "@/components/vanDetails/VanDetails";
import {
  isVanAvailable,
  updateVanAvailability,
} from "@/app/lib/actions/vanActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Van Details | Van Life",
  description: "Explore the features, availability, and booking options for this van. Find detailed specifications and plan your next adventure with Van Life."
};

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  console.log("Van ID:", id);
  const van = await fetchVanById(id);
  const isVanAvailableNow = await isVanAvailable(van?.bookings ?? []);

  if (van && isVanAvailableNow !== van.available) {
    await updateVanAvailability(id, isVanAvailableNow);
  }

  return (
    <main className="mt-30">
      {van && (
        <VanDetails
          id={van.id}
          name={van.name as string}
          price={van.price}
          description={van.description}
          images={van.images}
          type={van.type}
          city={van.city}
          country={van.country}
          rating={van.rating as number}
          features={{
            seats: van.features?.seats ?? 0,
            sleepingCapacity: van.features?.sleepingCapacity ?? 0,
            hasKitchen: van.features?.hasKitchen ?? false,
            hasToilet: van.features?.hasToilet ?? false,
            hasAC: van.features?.hasAC ?? false,
            hasHeating: van.features?.hasHeating ?? false,
            petFriendly: van.features?.petFriendly ?? false,
          }}
          available={isVanAvailableNow}
        />
      )}
    </main>
  );
};

export default page;
