import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-700/70">
        <li>
          <Link to="/" className="hover:text-ink-900">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link to={item.to} className="hover:text-ink-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-900" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
