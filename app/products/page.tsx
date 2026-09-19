import { PageContainer } from "@/components/layout/page-container";

const products = [
  { name: "WorkSphere SaaS", desc: "Full multi-tenant management platform with subscription management.", price: "Starting at $29/mo" },
  { name: "Ready-Made Business Tools", desc: "Pre-built tools for project management, time tracking, and CRM.", price: "Custom pricing" },
  { name: "Custom Software Packages", desc: "Tailored software solutions built specifically for your organization.", price: "Contact Us" },
];

export default function Products() {
  return (
    <PageContainer>
      <section className="container py-20">
        <h1 className="text-4xl font-bold mb-6">Our Products</h1>
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.name} className="rounded-lg border bg-card p-8">
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <p className="text-muted-foreground mt-4">{product.desc}</p>
              <p className="text-primary font-semibold mt-4">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
