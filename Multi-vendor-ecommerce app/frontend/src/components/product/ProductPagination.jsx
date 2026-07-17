export default function ProductPagination({

    page,

    setPage

}) {

    return (

        <div className="flex justify-center gap-5 mt-10">

            <button

                onClick={() => setPage(page - 1)}

                disabled={page === 1}

                className="rounded-lg bg-indigo-600 px-4 py-2 text-white"

            >

                Previous

            </button>

            <span className="text-xl font-bold">

                {page}

            </span>

            <button

                onClick={() => setPage(page + 1)}

                className="rounded-lg bg-indigo-600 px-4 py-2 text-white"

            >

                Next

            </button>

        </div>

    );

}