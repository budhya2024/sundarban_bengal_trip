import React from "react";
import { getContactSettings } from "@/app/admin/actions/contact-settings.actions";
import ContactPage from "@/components/pages/ContactPage";
import { ContactPageValues } from "@/schemas/adminContact.schema";

const Page = async () => {
  const { data } = (await getContactSettings()) as {
    data: ContactPageValues | null;
  };

  return <ContactPage data={data} />;
};

export default Page;
