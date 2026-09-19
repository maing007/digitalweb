import { PageContainer } from "@/components/layout/page-container";
import { Check } from "lucide-react";

const services = [
  { title: "Full-Stack Web Development", desc: "Build robust, scalable web applications with modern technologies." },
  { title: "Shopify Development", desc: "Custom Shopify stores and e-commerce solutions." },
  { title: "WordPress Development", desc: "Professional WordPress themes, plugins, and customization." },
  { title: "UI/UX Design", desc: "User-centered design that converts visitors into customers." },
  { title: "Mobile Application Development", desc: "Cross-platform mobile apps for iOS and Android." },
  { title: "AI Integrations & Automation", desc: "Smart automations and AI-powered workflows." },
  { title: "DevOps & Cloud Solutions", desc: "Infrastructure, deployment, and cloud architecture." },
  { title: "Custom Software Development", desc: "Tailored software solutions for your specific business needs." },
];

export default function Services() {
  return (
    <PageContainer>
      <section className="container py-20">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Techinovates offers a comprehensive range of digital services to help your business grow.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-lg border p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-muted-foreground mt-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
