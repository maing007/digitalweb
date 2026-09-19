export function AdminStats({ orgs, subscriptions }: { orgs: number; subscriptions: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border p-6"><h3 className="text-sm font-medium text-muted-foreground">Organizations</h3><p className="text-3xl font-bold mt-2">{orgs}</p></div>
      <div className="rounded-lg border p-6"><h3 className="text-sm font-medium text-muted-foreground">Subscriptions</h3><p className="text-3xl font-bold mt-2">{subscriptions}</p></div>
      <div className="rounded-lg border p-6"><h3 className="text-sm font-medium text-muted-foreground">Platform Health</h3><p className="text-3xl font-bold mt-2 text-green-600">✓</p></div>
      <div className="rounded-lg border p-6"><h3 className="text-sm font-medium text-muted-foreground">Active Users</h3><p className="text-3xl font-bold mt-2">--</p></div>
    </div>
  );
}
