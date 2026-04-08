const SOCIAL_LINKS = [
  { href: "https://github.com/jean182", label: "github" },
  { href: "https://twitter.com/jeanm182", label: "twitter" },
  { href: "/rss", label: "rss" },
];

export default function Footer() {
  return (
    <footer className="px-6 mt-16 mb-12 lg:max-w-reading lg:ml-32 xl:ml-48">
      <div className="border-t border-(--accent)/25 pt-8">
        <p className="text-sm text-(--muted) italic">
          Built with Next.js, MDX, and questionable taste.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-(--muted) transition-colors hover:text-(--heading)"
            >
              {link.label}
            </a>
          ))}
          <span className="ml-auto text-(--muted)">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
