import { getPackageBySlug } from "@/app/admin/actions/package.actions";
import PackageDetailsPage from "@/components/pages/PackageDetailPage";

const PackageDetails = async ({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) => {
  const { packageId } = await params;
  const packageData = await getPackageBySlug(packageId);
  return <PackageDetailsPage data={packageData.data} />;
};

export default PackageDetails;
