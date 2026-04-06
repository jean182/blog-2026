"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [{ href: "/about", label: "about" }];

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full px-6 py-8 mx-auto max-w-170 lg:mx-0 lg:ml-32 xl:ml-48">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className="text-lg font-medium tracking-tight transition-colors text-(--accent) hover:opacity-80"
        >
          loserkid
        </Link>

        {/* NAV */}
        <nav className="flex gap-6 text-sm font-normal">
          {NAV_ITEMS.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "transition-colors",
                  isActive(item.href)
                    ? "text-(--heading) hover:opacity-80"
                    : "text-(--muted) hover:opacity-80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
