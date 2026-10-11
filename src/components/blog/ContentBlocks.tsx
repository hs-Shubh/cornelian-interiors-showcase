import type { ContentBlock } from "@/data/blog/types";
import { RichText } from "./RichText";

/** Renders an article body: an ordered list of typed content blocks. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={block.id} className="font-heading text-2xl md:text-3xl font-semibold tracking-tight mt-14 mb-5 scroll-mt-28">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id} className="font-heading text-xl font-semibold tracking-tight mt-10 mb-4 scroll-mt-28">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="luxury-body mb-6 leading-relaxed">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="list-disc pl-6 mb-6 space-y-2 luxury-body">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 mb-6 space-y-3 luxury-body">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <figure className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-charcoal/70">
                {block.headers.map((h, i) => (
                  <th key={i} className="py-3 pr-4 font-heading font-semibold align-bottom">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-hairline align-top">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-3 pr-4 luxury-body-sm leading-relaxed">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <aside className="my-8 border-l-2 border-accent bg-secondary/60 pl-5 pr-4 py-4">
          {block.title && (
            <p className="font-heading font-semibold mb-1 text-foreground">{block.title}</p>
          )}
          <p className="luxury-body-sm leading-relaxed">
            <RichText text={block.body} />
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-champagne pl-5 italic font-heading text-xl leading-relaxed text-foreground">
          <RichText text={block.text} />
          {block.cite && <cite className="block mt-2 not-italic text-sm text-muted-foreground">— {block.cite}</cite>}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-8">
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            className="w-full h-auto rounded"
          />
          {block.caption && (
            <figcaption className="mt-3 text-xs tracking-wide text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}
