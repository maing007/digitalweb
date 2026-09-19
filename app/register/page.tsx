import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", companyName: "", plan: "STARTER" });
  const router = useRouter();
  const supabase = createClient();

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      if (error) throw error;
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageContainer>
      <section className="container py-20 flex justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-lg border bg-card p-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground mb-6">Join WorkSphere and start managing your business.</p>

            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className={cn("h-2 flex-1 rounded-full", step >= s ? "bg-primary" : "bg-muted")} />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Industry</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Software Development</option>
                      <option>IT Agency</option>
                      <option>Digital Marketing</option>
                      <option>Design Agency</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company Size</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-200</option>
                      <option>200+</option>
                    </select>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="text-sm font-medium">Select Plan</label>
                    <div className="grid gap-2">
                      {["STARTER", "GROWTH", "BUSINESS"].map((plan) => (
                        <label key={plan} className="flex items-center gap-2 rounded border p-3 cursor-pointer hover:bg-muted/50">
                          <input type="radio" name="plan" value={plan} checked={formData.plan === plan} onChange={() => setFormData({ ...formData, plan })} />
                          <span className="text-sm font-medium">{plan}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" className="flex-1" onClick={handleBack}>Back</Button>
                )}
                {step < 3 ? (
                  <Button type="button" className="flex-1" onClick={handleNext}>Next <ChevronRight className="ml-2 h-4 w-4" /></Button>
                ) : (
                  <Button type="submit" className="flex-1">Create Account</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
