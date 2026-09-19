import { PageContainer } from "@/components/layout/page-container";

export default function Pricing() {
  return (
    <PageContainer>
      <section className="container py-20">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-center mb-12">No hidden fees. Upgrade or downgrade at any time.</p>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { name: "STARTER", price: "$29", period: "/month", features: ["5 employees", "10 projects", "Basic reports", "Task management"] },
            { name: "GROWTH", price: "$79", period: "/month", features: ["25 employees", "50 projects", "Time tracking", "Analytics"] },
            { name: "BUSINESS", price: "$199", period: "/month", features: ["100 employees", "Unlimited projects", "API access", "Custom branding"] },
          ].map((plan) => (
            <div key={plan.name} className="rounded-lg border bg-card p-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-2">{plan.price}<span className="text-base font-normal text-muted-foreground">{plan.period}</span></p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">✓ {f}</li>
                ))}
              </ul>
              <a href="/register" className="mt-8 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700">Get Started</a>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Also available: <strong>ENTERPRISE</strong> — Custom pricing and dedicated support.</p>
        </div>
      </section>
    </PageContainer>
  );
}
