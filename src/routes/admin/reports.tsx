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
  const renderReport = (key: string, value: number) => {
    return (
      <div className="border border-gray-300 rounded-md p-2">
        {key}: {value}
      </div>
    );
  };
  return (
    <div className="space-y-2">
      <p className="text-2xl font-bold">Reports:</p>
      {renderReport("Total Sales", reports.totalSales)}
      {renderReport("Total Orders", reports.totalOrders)}
      {renderReport("Total Customers", reports.totalCustomers)}
      {renderReport("Total Products", reports.totalProducts)}
      {renderReport("Total Categories", reports.totalCategories)}
      {renderReport("Total Subcategories", reports.totalSubcategories)}
    </div>
  );
}
