import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Renders the tiny markdown subset used in blog content strings:
 *   **bold**            -> <strong>
 *   [label](/internal)  -> internal <Link>
 *   [label](https://…)  -> external <a target="_blank" rel="noopener">
 */
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

const linkClass =
  "text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors";

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {m[1]}
        </strong>,
      );
    } else {
      const label = m[2];
      const href = m[3];
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key++} to={href} className={linkClass}>
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>,
        );
      }
    }
    last = TOKEN.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
