import ContactPage from "@/components/admin/pages/ContactPage";
import { getContactSettings } from "../../../actions/contact-settings.actions";
import { ContactPageValues } from "@/schemas/adminContact.schema";

export const dynamic = "force-dynamic";

const Page = async () => {
  const result = await getContactSettings();

  // Normalize data to ensure it matches ContactPageValues exactly
  const contactData = result.data as ContactPageValues | null;

  const normalizedData = {
    heroTitle: contactData?.heroTitle ?? "",
    heroSubtitle: contactData?.heroSubtitle ?? "",
    // Ensure arrays always have at least one empty object if null
    phones: contactData?.phones?.length ? contactData.phones : [{ value: "" }],
    emails: contactData?.emails?.length ? contactData.emails : [{ value: "" }],
    schedules: contactData?.schedules?.length
      ? contactData.schedules
      : [{ value: "" }],
    address: contactData?.address ?? "",
    sidebarHeadline: contactData?.sidebarHeadline ?? "",
    sidebarDescription: contactData?.sidebarDescription ?? "",
    whatsappNumber: contactData?.whatsappNumber ?? "",
    heroImage: contactData?.heroImage ?? "",
  };

  return <ContactPage initialData={normalizedData} />;
};

export default Page;
