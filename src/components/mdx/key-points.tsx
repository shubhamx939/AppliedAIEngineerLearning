export function KeyPoints({
  items,
}: {
  items: Array<{ label: string; detail: string }>;
}) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="panel rounded-[1.75rem] p-5 transition hover:-translate-y-1"
        >
          <p className="display-title text-xl">{item.label}</p>
          <p className="mt-2 text-sm leading-7 text-[rgba(29,29,27,0.74)]">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
