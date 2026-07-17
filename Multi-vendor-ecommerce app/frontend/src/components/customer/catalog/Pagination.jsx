export default function Pagination({
  page,
  setPage,
}) {
  return (
    <div className="mt-10 flex justify-center gap-4">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded-lg bg-indigo-600 px-5 py-2 text-white disabled:bg-gray-400"
      >
        Previous
      </button>

      <span className="flex items-center text-xl font-bold">
        {page}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
      >
        Next
      </button>

    </div>
  );
}