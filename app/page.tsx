import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "next/link";

export default function Home() {
  const features = [
    "Multi-tenant organization isolation",
    "Role-based access control (RBAC)",
    "Project & task management",
    "Time tracking & performance analytics",
    "Client & CRM management",
    "Subscription & billing management",
    "Secure VPN access management",
    "Browser extension support",
  ];

  const plans = [
    { name: "STARTER", price: "$29/mo", features: ["5 employees", "10 projects", "Basic reports", "Task management"] },
    { name: "GROWTH", price: "$79/mo", features: ["25 employees", "50 projects", "Time tracking", "Analytics"] },
    { name: "BUSINESS", price: "$199/mo", features: ["100 employees", "Unlimited projects", "API access", "Custom branding"] },
  ];

  return (
    <PageContainer>
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Manage Your Business with{" "}
          <span className="text-primary">WorkSphere</span>
        </h1>
        <p className="text-muted-foreground mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          Multi-tenant SaaS platform by Techinovates. Organize teams, manage projects,
          track performance, and scale your business — all in one workspace.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why WorkSphere</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-20 bg-muted/50">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-lg border bg-card p-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-4">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
