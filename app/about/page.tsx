import React from "react";
import { getAboutPage } from "../actions/about.actions";
import { AboutValues } from "@/schemas/about.schema";
import AboutPage from "@/components/pages/AboutPage";

const page = async () => {
  const { data, success } = (await getAboutPage()) as {
    data: AboutValues;
    success: boolean;
    error?: string;
  };
  return <AboutPage data={data} />;
};

export default page;
