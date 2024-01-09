'use client';
import Carousal from '@/components/gallery/HorizontalScrollCarousal';
import { title } from '@/components/primitives';

export default function GalleryPage() {
  return (
    <div>
      <h1 className={title()}>Gallery</h1>
      <div className="mt-8">
        <Carousal />
      </div>
    </div>
  );
}
