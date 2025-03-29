import { FuelType, Type } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";
import { vansData } from "../data/data";


async function seedVans() {
  for (const van of vansData) {
    await prisma.van.create({
      data: {
        name: van.name,
        price: van.price,
        description: van.description,
        images: van.images,
        type: van.type as Type,
        available: van.available,
        location: van.location,
        rating: van.rating,
        features: van.features,
        fuelType: van.fuelType as FuelType,
        mileage: van.mileage,
        insuranceIncluded: van.insuranceIncluded,
        owner: {
          connect: { id: van.userId },
        },
      },
    });
  }
  console.log("Vans seeded successfully");
}

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
