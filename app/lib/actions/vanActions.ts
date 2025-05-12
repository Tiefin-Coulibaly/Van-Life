"use server";

import { ISearchParams } from "@/types/searchParams";
import { prisma } from "@/prisma/prisma";
import { Booking, Van } from "@prisma/client";
import { IVanWithBookings } from "@/types/vanWithBookings";

export const fetchAllVans = async (): Promise<Van[]> => {
  try {
    const vans: Van[] = await prisma.van.findMany();
    console.dir(vans, { depth: Infinity });
    return vans;
  } catch (error) {
    console.log(`Failed to fetch all vans: ${error}`);
    return [];
  }
};

export const fetchVansFilter = async (
  searchParams: ISearchParams,
): Promise<Van[]> => {
  try {
    let prismaQuery: any = {};

    for (let param in searchParams) {
      const value = searchParams[param];

      if (param === "type") {
        if (typeof value === "string") {
          prismaQuery[param] = value;
        } else {
          prismaQuery[param] = { in: value };
        }
      } else if (param === "min") {
        prismaQuery.price = {
          ...prismaQuery.price,
          gte: parseInt(value ?? "0"),
        };
      } else if (param === "max") {
        prismaQuery.price = {
          ...prismaQuery.price,
          lte: parseInt(value ?? "0"),
        };
      } else if (param === "date") {
        prismaQuery.bookings = {
          none: {
            startDate: { lte: new Date(value) },
            endDate: { gte: new Date(value) },
          },
        };
      } else if (param === "city" || param === "country") {
        if (!prismaQuery.OR) prismaQuery.OR = [];

        prismaQuery.OR.push({
          [param]: {
            contains: value,
            mode: "insensitive",
          },
        });
      }
    }

    console.log("Prisma Query:", prismaQuery);
    const vans = await prisma.van.findMany({
      where: prismaQuery,
    });

    return vans;
  } catch (error) {
    console.error("Error fetching vans:", error);
    return [];
  }
};

export const fetchVanById = async (id: string): Promise<IVanWithBookings | null> => {
  try {
    const van = await prisma.van.findUnique({
      where: { id: id },
      include: {
        bookings: true,
      },
    });
    if (!van) {
      throw new Error("Failed to fetch van by id");
    }
    console.log("Fetched van:", van);
    return van;
  } catch (error) {
    console.log(`Failed to fetch the van with id (${id}): ${error}`);
    return null;
  }
};

export const isVanAvailable = async (bookings: Booking[]): Promise<boolean> => {
  if (!bookings || bookings.length === 0) {
    return true;
  }
  
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  
 
  for (const booking of bookings) {
  
    if (booking.status === 'Canceled') continue;
    

    const startDate = new Date(booking.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(booking.endDate);
    endDate.setHours(0, 0, 0, 0);
    
 
    if (today >= startDate && today <= endDate) {
      console.log(`Van unavailable: Found booking from ${startDate} to ${endDate}`);
      return false;
    }
  }
  
  return true;
};

export const updateVanAvailabilityAfterBooking = async (vanId: string): Promise<void> => {
  try {
    const van = await prisma.van.findUnique({
      where: { id: vanId },
      include: { bookings: true },
    });
    
    if (!van) {
      console.error(`Van with id ${vanId} not found`);
      return;
    }

    const isAvailable = await isVanAvailable(van.bookings);
    
    if (van.available !== isAvailable) {
      await prisma.van.update({
        where: { id: vanId },
        data: { available: isAvailable },
      });
      console.log(`Van ${vanId} availability updated to ${isAvailable}`);
    }
  } catch (error) {
    console.error(`Failed to update van availability after booking: ${error}`);
  }
};


export const updateVanAvailability = async (id: string, available: boolean): Promise<void> => {
  try {
    await prisma.van.update({
      where: { id: id },
      data: { available: available },
    });
  } catch (error) {
    console.error(`Failed to update van availability for id (${id}): ${error}`);
  }
}