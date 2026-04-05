"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [{ href: "/about", label: "about" }];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full px-6 py-10 mx-auto max-w-170 lg:mx-0 lg:ml-32 xl:ml-48">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className="text-[18px] font-medium tracking-tight text-(--heading) transition-colors hover:opacity-80"
        >
          loserkid
        </Link>

        {/* NAV */}
        <nav className="flex gap-6 text-sm font-normal">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "transition-colors",
                  isActive
                    ? "text-(--accent) hover:opacity-80"
                    : "text-(--muted) hover:text-(--heading)",
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
