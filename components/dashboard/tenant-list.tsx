export function TenantList({ employees }: { employees: any[] }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Employees</h3>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-muted/50">
              <td className="p-3">{emp.first_name} {emp.last_name}</td>
              <td className="p-3">{emp.email}</td>
              <td className="p-3">{emp.role}</td>
              <td className="p-3">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
