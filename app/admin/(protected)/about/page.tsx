import AboutAdminForm from "@/components/admin/AboutAdminForm";
import { getAboutPage } from "../../../actions/about.actions";
import { AboutValues } from "@/schemas/about.schema";

const page = async () => {
  const { data, success } = (await getAboutPage()) as {
    data: AboutValues;
    success: boolean;
    error?: string;
  };
  return <AboutAdminForm initialData={success ? data : null} />;
};

export default page;
