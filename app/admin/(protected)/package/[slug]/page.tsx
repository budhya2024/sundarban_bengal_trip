import { getPackageBySlug } from "@/app/actions/package.actions";
import PackageForm from "@/components/admin/PackageForm";
import { PackageValues } from "@/schemas/package.schema";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { data: packageData } = await getPackageBySlug(slug);

  return <PackageForm initialData={packageData} />;
};

export default page;
