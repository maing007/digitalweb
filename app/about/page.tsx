import { PageContainer } from "@/components/layout/page-container";

export default function About() {
  return (
    <PageContainer>
      <section className="container py-20">
        <h1 className="text-4xl font-bold mb-6">About Techinovates</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Techinovates is a software company building WorkSphere — a modern multi-tenant
          SaaS platform designed for software houses, IT agencies, digital marketing companies,
          and design agencies.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { title: "Our Mission", desc: "Empower businesses with powerful, isolated workspaces." },
            { title: "Our Vision", desc: "Become the leading multi-tenant management platform." },
            { title: "Our Team", desc: "Experienced developers, designers, and project managers." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
