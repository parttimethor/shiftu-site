import { cn } from "@/lib/cn";

interface ImageSource {
  src: string;
  alt: string;
}

export interface RevealItem {
  text: string;
  href?: string;
  images: [ImageSource, ImageSource];
}

function RevealImageListItem({ text, images }: RevealItem) {
  const container = "absolute right-2 -top-1 z-40 h-20 w-16 sm:right-8";
  const effect =
    "relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden transition-all rounded-xl";

  return (
    <div className="group relative h-fit w-fit overflow-visible py-6">
      <h3 className="text-5xl font-black uppercase tracking-tight text-inherit transition-all duration-500 group-hover:opacity-40 sm:text-7xl">
        {text}
      </h3>
      <div className={container}>
        <div className={effect}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={images[1].alt} src={images[1].src} className="h-full w-full object-cover" />
        </div>
      </div>
      <div
        className={cn(
          container,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12",
        )}
      >
        <div className={cn(effect, "duration-200")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={images[0].alt} src={images[0].src} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export function RevealImages({ items, className }: { items: RevealItem[]; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <RevealImageListItem key={item.text} {...item} />
      ))}
    </div>
  );
}
