import { PageContainer } from "@/components/layout/page-container";

export default function RegisterPage() {
  return (
    <PageContainer>
      <section className="container py-20 flex justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-sm text-muted-foreground mb-6">Join WorkSphere and start managing your business.</p>
              <div className="flex gap-2 mb-6">
                <div className="h-2 flex-1 rounded-full bg-blue-600" />
                <div className="h-2 flex-1 rounded-full bg-muted" />
                <div className="h-2 flex-1 rounded-full bg-muted" />
              </div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" placeholder="Your company name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                    <option>Software Development</option>
                    <option>IT Agency</option>
                    <option>Digital Marketing</option>
                    <option>Design Agency</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Company Size</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>200+</option>
                  </select>
                </div>
                <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
