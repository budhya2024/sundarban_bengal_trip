import React from "react";

import {
  fetchGallertyCategories,
  getAllGalleryItems,
} from "../actions/gallery.actions";
import GalleryPage from "@/components/pages/GalleryPage";

export const dynamic = "force-dynamic";

const page = async () => {
  const [{ data: galleryItems }, { data: categories }] = await Promise.all([
    getAllGalleryItems(),
    fetchGallertyCategories(),
  ]);

  return (
    <GalleryPage
      galleryItems={galleryItems || []}
      categories={[
        "all",
        "wildlife",
        "landscape",
        "activities",
        "sunset",
        ...(categories || []),
      ]}
    />
  );
};

export default page;
