import Packages from "@/components/pages/PackagePages";
import { getPackages } from "../actions/package.actions";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const { data } = await getPackages();

  return <Packages packages={data || []} />;
}
