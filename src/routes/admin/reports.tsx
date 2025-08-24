import { createFileRoute } from "@tanstack/react-router";
import { getReports } from "../../lib/mock";

export const Route = createFileRoute("/admin/reports")({
  component: RouteComponent,
  loader: async () => {
    const reports = await getReports();
    return { reports };
  },
});

function RouteComponent() {
  const { reports } = Route.useLoaderData();
  return (
    <div className="space-y-2">
      <p className="text-2xl font-bold">Reports:</p>
      <div className="card">Total Sales: {reports.totalSales}</div>
      <div className="card">Total Orders: {reports.totalOrders}</div>
      <div className="card">Total Customers: {reports.totalCustomers}</div>
      <div className="card">Total Products: {reports.totalProducts}</div>
    </div>
  );
}
