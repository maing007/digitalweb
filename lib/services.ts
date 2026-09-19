import { prisma } from "./prisma";

export async function getOrganizationBySlug(slug: string) {
  return prisma.organization.findUnique({ where: { slug } });
}

export async function createOrganization(data: { name: string; slug: string; industry?: string; companySize?: string; country?: string }) {
  return prisma.organization.create({ data: { ...data, id: crypto.randomUUID() } });
}

export async function createUser(data: { email: string; passwordHash: string; name?: string }) {
  return prisma.user.create({ data: { ...data, id: crypto.randomUUID() } });
}

export async function createOrganizationMember(data: { userId: string; organizationId: string; role: string; department?: string }) {
  return prisma.organizationMember.create({ data: { ...data, id: crypto.randomUUID() } });
}

export async function getSubscriptionPlans() {
  return prisma.subscriptionPlan.findMany({ where: { isActive: true } });
}

export async function createSubscription(data: { organizationId: string; planId: string }) {
  return prisma.subscription.create({ data: { ...data, id: crypto.randomUUID() } });
}
