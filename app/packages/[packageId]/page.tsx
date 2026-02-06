import { getPackageBySlug } from "@/app/admin/actions/package.actions";
import PackageDetailsPage from "@/components/pages/PackageDetailPage";
import React from "react";

const PackageDetails = async ({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) => {
  const { packageId } = await params;
  const { data } = await getPackageBySlug(packageId);
  return <PackageDetailsPage data={data} />;
};

export default PackageDetails;
