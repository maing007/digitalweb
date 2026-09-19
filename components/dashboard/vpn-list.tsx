export function VPNList({ configs }: { configs: any[] }) {
  return (
    <div className="mt-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Tenant</th>
            <th className="text-left p-3">Active</th>
            <th className="text-left p-3">Expires</th>
          </tr>
        </thead>
        <tbody>
          {configs.map((config) => (
            <tr key={config.id} className="border-b hover:bg-muted/50">
              <td className="p-3">{config.tenant_id}</td>
              <td className="p-3">{config.active ? "Yes" : "No"}</td>
              <td className="p-3">{config.expires_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
