import ContactPage from "@/components/admin/pages/ContactPage";
import { getContactSettings } from "../../../actions/contact-settings.actions";
import { ContactPageValues } from "@/schemas/adminContact.schema";

const Page = async () => {
  const result = await getContactSettings();

  if (!result.success) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          <strong>Error:</strong> {result.error}. Please try refreshing.
        </div>
      </div>
    );
  }

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
