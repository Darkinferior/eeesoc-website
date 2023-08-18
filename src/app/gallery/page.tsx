import GalleryLayout from "@/components/gallery/GalleryLayout";
import { pageTitle } from "@/data/constants";
import { galleryPics } from "@/data/galleryPics";

export const metadata = {
  title: `${pageTitle} | Gallery`,
};

export default function Gallery() {
  return (
    <div className="wrapper">
      <h1 className="text-center">Gallery</h1>

      <section className="grid items-stretch mt-8 sm:grid-cols-2 xl:grid-cols-3">
        {galleryPics.map((image, index) => (
          <GalleryLayout key={image} index={index} image={image} />
        ))}
      </section>
    </div>
  );
}
