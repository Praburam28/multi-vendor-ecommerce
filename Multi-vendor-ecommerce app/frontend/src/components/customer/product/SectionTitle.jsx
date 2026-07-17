export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-4xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}