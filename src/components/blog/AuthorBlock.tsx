import { Link } from "react-router-dom";
import type { BlogAuthor } from "@/data/blog/types";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ author, size }: { author: BlogAuthor; size: number }) {
  if (author.headshot) {
    return (
      <img
        src={author.headshot}
        alt={`${author.name}, ${author.title} at Cornelian Executive Interiors`}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="rounded-full bg-charcoal text-cream flex items-center justify-center font-heading flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials(author.name)}
    </span>
  );
}

/** Compact inline byline, rendered under the H1. */
export function AuthorBlock({ author }: { author: BlogAuthor }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar author={author} size={44} />
      <div className="leading-tight">
        <span className="block font-heading font-semibold text-foreground">{author.name}</span>
        <Link to={author.url} className="text-sm text-muted-foreground hover:text-accent transition-colors">
          {author.title}
        </Link>
      </div>
    </div>
  );
}

/** Expanded bio card, rendered near the foot of a post. */
export function AuthorCard({ author }: { author: BlogAuthor }) {
  return (
    <section className="my-12 border border-hairline bg-secondary/50 p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start">
      <Avatar author={author} size={72} />
      <div>
        <p className="luxury-label mb-1">About the author</p>
        <h3 className="font-heading text-xl font-semibold">{author.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{author.title}, Cornelian Executive Interiors</p>
        <p className="luxury-body-sm leading-relaxed mb-4">{author.bioLong}</p>
        <Link
          to={author.url}
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.1em] uppercase text-accent hover:gap-3 transition-all"
        >
          More about {author.name.split(/\s+/)[0]}
        </Link>
      </div>
    </section>
  );
}
