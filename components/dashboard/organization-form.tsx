"use client";

import { useState } from "react";
import { Organization } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

export function OrganizationForm({ tenant }: { tenant: Organization }) {
  const [name, setName] = useState(tenant.name);
  const [industry, setIndustry] = useState(tenant.industry ?? "");
  const [companySize, setCompanySize] = useState(tenant.companySize ?? "");
  const [country, setCountry] = useState(tenant.country ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/organizations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, industry, companySize, country }),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Company Name</Label>
            <Input id="org-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-industry">Industry</Label>
            <Input id="org-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-size">Company Size</Label>
            <Input id="org-size" value={companySize} onChange={(e) => setCompanySize(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-country">Country</Label>
            <Input id="org-country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
