import { getDashboardStats } from "@/app/actions/home.actions";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function Page() {
  const { stats } = await getDashboardStats();

  return <AdminDashboard stats={stats} />;
}
