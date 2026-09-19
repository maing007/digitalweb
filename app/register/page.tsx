"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LucideAlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
    companySize: "",
    plan: "STARTER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            company_name: formData.companyName,
          },
        },
      });
      if (signUpError) throw signUpError;
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Join WorkSphere and start managing your business.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <LucideAlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${step >= s ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <select
                    id="industry"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="">Select industry...</option>
                    <option>Software Development</option>
                    <option>IT Agency</option>
                    <option>Digital Marketing</option>
                    <option>Design Agency</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <select
                    id="size"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  >
                    <option value="">Select size...</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>200+</option>
                  </select>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <Label>Select Plan</Label>
                <div className="grid gap-2">
                  {["STARTER", "GROWTH", "BUSINESS"].map((plan) => (
                    <label key={plan} className="flex items-center gap-2 rounded border p-3 cursor-pointer hover:bg-muted/50">
                      <input
                        type="radio"
                        name="plan"
                        value={plan}
                        checked={formData.plan === plan}
                        onChange={() => setFormData({ ...formData, plan })}
                      />
                      <span className="text-sm font-medium">{plan}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" className="flex-1" onClick={handleBack}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" className="flex-1" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
