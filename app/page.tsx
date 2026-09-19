import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <PageContainer>
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Manage Your Business with{" "}
          <span className="text-blue-600">WorkSphere</span>
        </h1>
        <p className="text-muted-foreground mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          Multi-tenant SaaS platform by Techinovates. Organize teams, manage projects,
          track performance, and scale your business — all in one workspace.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <a href="/register" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
            Start Free Trial
          </a>
          <a href="/pricing" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm hover:bg-accent transition-colors">
            View Pricing
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {["Multi-tenant organization isolation", "Role-based access control (RBAC)", "Project & task management", "Time tracking & performance analytics"].map((f) => (
            <div key={f} className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-muted/50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { name: "STARTER", price: "$29/mo", features: ["5 employees", "10 projects", "Basic reports", "Task management"] },
              { name: "GROWTH", price: "$79/mo", features: ["25 employees", "50 projects", "Time tracking", "Analytics"] },
              { name: "BUSINESS", price: "$199/mo", features: ["100 employees", "Unlimited projects", "API access", "Custom branding"] },
            ].map((plan) => (
              <div key={plan.name} className="rounded-lg border bg-card p-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-4xl font-bold mt-2">{plan.price}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">✓ {f}</li>
                  ))}
                </ul>
                <a href="/register" className="mt-8 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
