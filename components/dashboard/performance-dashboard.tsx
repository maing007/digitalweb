export function PerformanceDashboard({ reviews }: { reviews: any[] }) {
  return (
    <div className="mt-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Employee</th>
            <th className="text-left p-3">Period</th>
            <th className="text-left p-3">Score</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="border-b hover:bg-muted/50">
              <td className="p-3">{review.employee_id}</td>
              <td className="p-3">{review.review_period}</td>
              <td className="p-3">{review.score}/5</td>
              <td className="p-3">{review.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
