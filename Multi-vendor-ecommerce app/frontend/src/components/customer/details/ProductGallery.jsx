import { getImageUrl } from "../../../utils/image";

export default function ProductGallery({ image }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <img
        src={getImageUrl(image)}
        alt="Product"
        className="h-full w-full rounded-2xl object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/700x700?text=No+Image";
        }}
      />
    </div>
  );
}