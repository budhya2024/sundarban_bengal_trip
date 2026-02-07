import GalleryManager from "@/components/admin/GalleryManager";
import {
  fetchGallertyCategories,
  getAllGalleryItems,
} from "../../../actions/gallery.actions";

export default async function GalleryPage() {
  const [{ data }, { data: categoryData }] = await Promise.all([
    await getAllGalleryItems(),
    await fetchGallertyCategories(),
  ]);

  return (
    <GalleryManager
      initialImages={data || []}
      categoryData={categoryData || []}
    />
  );
}
