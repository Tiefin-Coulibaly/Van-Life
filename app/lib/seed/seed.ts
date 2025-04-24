import { FuelType, Role, Type, BookingStatus, PaymentStatus, PaymentMethod, NotificationType } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";
import { notificationTemplates, reviewComments, userData,  vansData } from "../data/data";
import { v4 as uuidv4 } from "uuid";

// Main seeding function
async function main() {
  console.log("Starting database seeding...");
  
  // 1. Seed users first
  const users = await seedUsers();
  
  // 2. Seed vans
  await seedVans(users);
  
  // 3. Seed bookings
  await seedBookings();
  
  // 4. Seed reviews
  await seedReviews();
  
  // 5. Seed payments
  await seedPayments();
  
  // 6. Seed notifications
  await seedNotifications();
  
  // 7. Seed accounts for Google auth
  await seedAccounts();
  
  console.log("Database seeding completed successfully!");
}

// 1. Seed Users
async function seedUsers() {
  console.log("Seeding users...");
  
  try {
    // Delete existing data in a specific order to avoid foreign key constraint issues
    await prisma.notification.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.van.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    
    const users = await userData();

    // Create all users
    const createdUsers: Array<{ id: string; name: string; email: string; role: Role }> = [];
    for (const user of users) {
      const createdUser = await prisma.user.create({
        data: user
      });
      createdUsers.push({
        id: createdUser.id,
        name: createdUser.name ?? "Unknown Name",
        email: createdUser.email,
        role: createdUser.role,
      });
    }
    
    console.log(`Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

// 2. Seed Vans
async function seedVans(users) {
  console.log("Seeding vans...");
  
  try {
    await prisma.van.deleteMany();

    const Renters = users.filter(u => u.role === "Renter");
 
    for (const [index, van] of vansData.entries()) {
   
      const Renter = Renters[index % Renters.length];
      
      await prisma.van.create({
        data: {
          name: van.name,
          price: van.price,
          description: van.description,
          images: van.images,
          type: van.type as Type,
          available: van.available,
          city: van.city,
          country: van.country,
          rating: van.rating,
          features: van.features,
          fuelType: van.fuelType as FuelType,
          mileage: van.mileage,
          insuranceIncluded: van.insuranceIncluded,
          userId: Renter.id,
        },
      });
    }

    // Fixed: Changed sampleVans to vansData
    console.log(`Seeded ${vansData.length} vans`);
  } catch (error) {
    console.error("Error seeding vans:", error);
    throw error;
  }
}

// 3. Seed Bookings
async function seedBookings() {
  console.log("Seeding bookings...");
  
  try {
   
    await prisma.booking.deleteMany();
    
 
    const renters = await prisma.user.findMany({
      where: { role: "Renter" }
    });
    
   
    const vans = await prisma.van.findMany({
      where: { available: true }
    });
    
    const bookings: {
      vanId: string;
      userId: string;
      startDate: Date;
      endDate: Date;
      status: BookingStatus;
      totalAmount: number;
    }[] = [];
    const today = new Date();
    
    // Create 15 bookings
    for (let i = 0; i < 15; i++) {
      const renter = renters[Math.floor(Math.random() * renters.length)];
      const van = vans[Math.floor(Math.random() * vans.length)];
      
      const startOffset = Math.floor(Math.random() * 70) - 10;
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() + startOffset);
      
   
      const durationDays = Math.floor(Math.random() * 12) + 3;
      const endDate = new Date(startDate);
      let status: BookingStatus;
      
     
      const totalAmount = van.price * durationDays;
      
    
      const statusRoll = Math.random();
      if (startOffset < 0) {
       
        status = Math.random() > 0.2 ? "Confirmed" : "Canceled";
      } else if (statusRoll < 0.7) {
        status = "Confirmed";
      } else if (statusRoll < 0.9) {
        status = "Pending";
      } else {
        status = "Canceled";
      }
      
      bookings.push({
        vanId: van.id,
        userId: renter.id,
        startDate,
        endDate,
        status: status as BookingStatus,
        totalAmount
      });
    }
    
 
    for (const booking of bookings) {
      await prisma.booking.create({
        data: booking
      });
    }
    
    console.log(`Seeded ${bookings.length} bookings`);
  } catch (error) {
    console.error("Error seeding bookings:", error);
    throw error;
  }
}

// 4. Seed Reviews
async function seedReviews() {
  console.log("Seeding reviews...");
  
  try {
    
    await prisma.review.deleteMany();
    
   
    const renters = await prisma.user.findMany({
      where: { role: "Renter" }
    });
    
    
    const vans = await prisma.van.findMany();
    
   
    
    const reviews: { vanId: string; userId: string; rating: number; comment: string }[] = [];
    
 
    for (let i = 0; i < 20; i++) {
      const renter = renters[Math.floor(Math.random() * renters.length)];
      const van = vans[Math.floor(Math.random() * vans.length)];
      
     
      let rating;
      const ratingRoll = Math.random();
      if (ratingRoll < 0.05) {
        rating = Math.floor(Math.random() * 2) + 1; 
      } else if (ratingRoll < 0.15) {
        rating = Math.floor(Math.random() * 1) + 3; 
      } else {
        rating = Math.floor(Math.random() * 2) + 4; 
      }
      
     
      const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)];
      
      reviews.push({
        vanId: van.id,
        userId: renter.id,
        rating,
        comment
      });
    }
    

    for (const review of reviews) {
      await prisma.review.create({
        data: review
      });
    }
    
    console.log(`Seeded ${reviews.length} reviews`);
    
  
    const vansWithReviews = await prisma.van.findMany({
      include: {
        reviews: true
      }
    });
    
    for (const van of vansWithReviews) {
      if (van.reviews.length > 0) {
        const totalRating = van.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / van.reviews.length;
        
        await prisma.van.update({
          where: { id: van.id },
          data: { rating: parseFloat(averageRating.toFixed(1)) }
        });
      }
    }
    
    console.log("Updated van ratings based on reviews");
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
}

// 5. Seed Payments
async function seedPayments() {
  console.log("Seeding payments...");
  
  try {
 
    await prisma.payment.deleteMany();
    
 
    const bookings = await prisma.booking.findMany({
      where: {
        status: "Confirmed"
      },
      include: {
        van: true,
        user: true
      }
    });
    
    const payments: {
      bookingId: string;
      userId: string;
      vanId: string;
      amount: number;
      status: PaymentStatus;
      method: PaymentMethod;
    }[] = [];
    
    for (const booking of bookings) {
    
      const methods = ["CreditCard", "Paypal"];
      const method = methods[Math.floor(Math.random() * methods.length)];
      
   
      const statuses = ["Confirmed", "Pending", "Failed"];
      const statusWeights = [0.8, 0.15, 0.05]; // 80% confirmed, 15% pending, 5% failed
      
      let statusIndex;
      const roll = Math.random();
      if (roll < statusWeights[0]) {
        statusIndex = 0; 
      } else if (roll < statusWeights[0] + statusWeights[1]) {
        statusIndex = 1; 
      } else {
        statusIndex = 2; 
      }
      
      payments.push({
        bookingId: booking.id,
        userId: booking.userId,
        vanId: booking.vanId,
        amount: booking.totalAmount,
        status: statuses[statusIndex] as PaymentStatus,
        method: method as PaymentMethod
      });
    }
    
 
    for (const payment of payments) {
      await prisma.payment.create({
        data: payment
      });
    }
    
    console.log(`Seeded ${payments.length} payments`);
  } catch (error) {
    console.error("Error seeding payments:", error);
    throw error;
  }
}

// 6. Seed Notifications
async function seedNotifications() {
  console.log("Seeding notifications...");
  
  try {

    await prisma.notification.deleteMany();
    
    const users = await prisma.user.findMany();
    
    const notificationTypes = ["Booking", "Payment", "Message", "Alert", "System"];
    const notifications: {
      userId: string;
      type: NotificationType;
      title: string;
      Message: string;
      link: string | null;
      read: boolean;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];
    
   
    for (let i = 0; i < 30; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      
    
      const templates = notificationTemplates[type];
      const template = templates[Math.floor(Math.random() * templates.length)];
      
    
      const read = Math.random() < 0.7;
      
 
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      notifications.push({
        userId: user.id,
        type: type as NotificationType,
        title: template.title,
        Message: template.message
          .replace("USERNAME", `${user.firstName || ''} ${user.lastName || ''}`)
          .replace("BOOKINGID", Math.floor(Math.random() * 10000).toString())
          .replace("LOCATION", ["New York", "Los Angeles", "Chicago", "Dallas", "Miami"][Math.floor(Math.random() * 5)])
          .replace("DATE", new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()),
        link: Math.random() < 0.6 ? `/dashboard/${type.toLowerCase()}` : null,
        read,
        createdAt: date,
        updatedAt: date
      });
    }
    
   
    for (const notification of notifications) {
      await prisma.notification.create({
        data: notification
      });
    }
    
    console.log(`Seeded ${notifications.length} notifications`);
  } catch (error) {
    console.error("Error seeding notifications:", error);
    throw error;
  }
}


async function seedAccounts() {
  console.log("Seeding accounts...");
  
  try {
   
    await prisma.account.deleteMany();
    
    // Get all users
    const users = await prisma.user.findMany();
    
    const accounts: {
      userId: string;
      type: string;
      provider: string;
      providerAccountId: string;
      access_token?: string;
      token_type?: string;
      id_token?: string;
      scope?: string;
    }[] = [];
    
 
    for (const user of users) {
      accounts.push({
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: uuidv4(),
      });
      
 
      if (Math.random() < 0.3) {
        accounts.push({
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: `google-${uuidv4()}`,
          access_token: `access-token-${uuidv4()}`,
          token_type: "Bearer",
          id_token: `id-token-${uuidv4()}`,
          scope: "openid profile email",
        });
      }
    }
    
 
    for (const account of accounts) {
      await prisma.account.create({
        data: account
      });
    }
    
    console.log(`Seeded ${accounts.length} accounts`);
  } catch (error) {
    console.error("Error seeding accounts:", error);
    throw error;
  }
}


main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
   
    await prisma.$disconnect();
  });