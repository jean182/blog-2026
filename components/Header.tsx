"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const NAV_ITEMS = [{ href: "/about", label: "about" }];

// Animated sun/moon icons
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ContrastIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20" />
      <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" />
    </svg>
  );
}

function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex items-center w-6 h-6">
      {/* Sun - visible in dark mode only */}
      <SunIcon 
        className="absolute inset-0 m-auto w-4 h-4 text-(--muted) pointer-events-none transition-all duration-300 rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100 high-contrast:rotate-90 high-contrast:scale-0 high-contrast:opacity-0"
      />
      {/* Moon - visible in light mode (default) */}
      <MoonIcon 
        className="absolute inset-0 m-auto w-4 h-4 text-(--muted) pointer-events-none transition-all duration-300 rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0 high-contrast:-rotate-90 high-contrast:scale-0 high-contrast:opacity-0"
      />
      {/* Contrast - visible in high-contrast mode only */}
      <ContrastIcon 
        className="absolute inset-0 m-auto w-4 h-4 text-(--muted) pointer-events-none transition-all duration-300 rotate-180 scale-0 opacity-0 high-contrast:rotate-0 high-contrast:scale-100 high-contrast:opacity-100"
      />
      
      {/* Native select - transparent bg but shows focus ring */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        aria-label="Select theme"
        className="absolute inset-0 w-full h-full bg-transparent text-transparent cursor-pointer appearance-none rounded"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="high-contrast">High Contrast</option>
      </select>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  // Logo uses CSS variables for smooth theme transition
  const logoClass = "text-xl font-bold bg-clip-text text-transparent hover:opacity-80 transition-all duration-300";

  return (
    <header className="w-full px-6 py-8 lg:max-w-reading lg:ml-32 xl:ml-48">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className={`tracking-tight ${logoClass}`}
          style={{
            backgroundImage: "linear-gradient(to right, var(--logo-from), var(--logo-to))",
          }}
        >
          loserkid
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-sm font-normal">
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

          <ThemeSelect />
        </nav>
      </div>
    </header>
  );
}
