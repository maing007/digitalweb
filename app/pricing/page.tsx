import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "next/link";

const plans = [
  { name: "STARTER", price: "$29", period: "/month", features: ["5 employees", "10 projects", "Basic reports", "Task management", "Email support"], recommended: false },
  { name: "GROWTH", price: "$79", period: "/month", features: ["25 employees", "50 projects", "Time tracking", "Analytics & reports", "Client portal", "Priority support"], recommended: true },
  { name: "BUSINESS", price: "$199", period: "/month", features: ["100 employees", "Unlimited projects", "API access", "Custom branding", "Advanced controls", "Dedicated support"], recommended: false },
];

export default function Pricing() {
  return (
    <PageContainer>
      <section className="container py-20">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-center mb-12">
          No hidden fees. Upgrade or downgrade at any time.
        </p>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-lg border p-8 ${plan.recommended ? "ring-2 ring-primary" : ""}`}>
              {plan.recommended && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>
              )}
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
              <p className="text-4xl font-bold mt-2">{plan.price}<span className="text-base font-normal text-muted-foreground">{plan.period}</span></p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" asChild variant={plan.recommended ? "default" : "outline"}>
                <Link href="/register">Get Started</Link>
              </Button>
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
