import { PageContainer } from "@/components/layout/page-container";

export default function Contact() {
  return (
    <PageContainer>
      <section className="container py-20">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about WorkSphere? We would love to hear from you.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground">contact@worksphere.io</p>
              </div>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-muted-foreground">Mumbai, India</p>
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-muted-foreground">+91 976 7865 320</p>
              </div>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tell us about your project..." />
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageContainer>
  );
}
