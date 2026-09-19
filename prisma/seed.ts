import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: "STARTER",
      description: "Small team, basic project management",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: ["5 max employees", "10 max projects", "Basic reports", "Task management"],
      maxEmployees: 5,
      maxProjects: 10,
      maxClients: 10,
      maxStorage: 512,
      isDefault: true,
    },
    {
      name: "GROWTH",
      description: "Larger team with time tracking and analytics",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: ["25 max employees", "50 max projects", "Time tracking", "Employee analytics", "Client portal"],
      maxEmployees: 25,
      maxProjects: 50,
      maxClients: 50,
      maxStorage: 2048,
    },
    {
      name: "BUSINESS",
      description: "Advanced reporting and custom branding",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: ["100 max employees", "Unlimited projects", "Custom branding", "API access", "Advanced controls"],
      maxEmployees: 100,
      maxProjects: -1,
      maxClients: -1,
      maxStorage: 10240,
    },
    {
      name: "ENTERPRISE",
      description: "Custom pricing, dedicated support",
      monthlyPrice: null,
      yearlyPrice: null,
      features: ["Custom limits", "Dedicated support", "Enterprise configuration"],
      maxEmployees: -1,
      maxProjects: -1,
      maxClients: -1,
      maxStorage: -1,
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan,
    });
  }

  console.log("Seed data created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
