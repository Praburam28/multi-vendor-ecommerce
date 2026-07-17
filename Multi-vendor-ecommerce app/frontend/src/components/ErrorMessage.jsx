export default function ErrorMessage({ message }) {
  return (
    <div className="mx-auto my-10 max-w-lg rounded-lg bg-red-100 p-4 text-center text-red-700">
      {message}
    </div>
  );
}