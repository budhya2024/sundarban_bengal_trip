import Packages from "@/components/pages/PackagePages";
import { getPackages } from "../admin/actions/package.actions";

export default async function PackagesPage() {
  const { data } = await getPackages();

  return <Packages packages={data || []} />;
}
