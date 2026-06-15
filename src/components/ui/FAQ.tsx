import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto mt-10 max-w-3xl divide-y divide-hair">
      {items.map((it, i) => (
        <Reveal key={i} delay={i * 0.04}>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
              <span className="text-lg font-semibold text-ink">{it.q}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hair text-muted transition-transform duration-200 group-open:rotate-45">
                <Icon name="ArrowUpRight" size={15} />
              </span>
            </summary>
            <p className="mt-3 max-w-prose text-muted">{it.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
