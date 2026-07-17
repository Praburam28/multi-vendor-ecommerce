export default function ProductGallery({ image }) {

  return (

    <div className="rounded-3xl bg-white p-6 shadow">

      <img

        src={
          image ||
          "https://placehold.co/700x700?text=No+Image"
        }

        className="rounded-2xl"

      />

    </div>

  );

}