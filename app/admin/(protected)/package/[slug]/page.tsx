import { getPackageBySlug } from "@/app/actions/package.actions";
import PackageForm from "@/components/admin/PackageForm";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { data: packageData } = await getPackageBySlug(slug);

  return <PackageForm initialData={packageData} />;
};

export default page;
