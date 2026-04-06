import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About Jean Aguilar and this blog.",
};

const LINKS = [
  { href: "https://github.com/jean182", label: "GitHub" },
  { href: "https://twitter.com/jeanm182", label: "Twitter" },
  { href: "https://stackoverflow.com/users/6064073/jean182", label: "Stack Overflow" },
  { href: "https://www.linkedin.com/in/jean182/", label: "LinkedIn" },
];

export default function AboutPage() {
  return (
    <div className="relative max-w-130 pb-12 xl:pb-0">
      <div className="mb-8 flex items-center gap-5">
        <Image
          src="/profile-pic.jpg"
          alt="Jean Aguilar"
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--heading)">Jean Aguilar</h1>
          <p className="font-sans text-sm text-(--muted)">Software engineer from Costa Rica</p>
        </div>
      </div>

      <p className="text-base leading-relaxed text-(--text) lg:text-lg">
        I'm a developer who spends too much time thinking about code and not enough time shipping it. Born and raised in Costa Rica, currently 29, increasingly aware that my body has an expiration date.
      </p>

      <p className="mt-4 text-base leading-relaxed text-(--text) lg:text-lg">
        Outside of work I'm into physical media — 4K Blu-rays, CDs, vinyl — the kind of stuff that makes people ask "why don't you just stream it?" I watch football (the real one), follow basketball, drink Guinness, and have a sense of humor that most people describe as "a lot."
      </p>

      <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-(--heading)">Why this blog</h2>

      <p className="text-base leading-relaxed text-(--text) lg:text-lg">
        I had a blog before. Stopped posting in 2021 and let it rot. This is the rebuild — done properly this time, or at least that's the plan. I want to write about code, maybe about movies or music I've discovered in the years I was quiet. We'll see if I actually follow through.
      </p>

      <aside className="mt-12 xl:mt-0 xl:fixed xl:top-24 xl:right-12 xl:w-44">
        <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-(--muted)">
          Elsewhere
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 xl:block xl:space-y-2 xl:border-l xl:border-(--accent)/25 xl:pl-4 xl:gap-0">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-(--muted) transition-colors hover:text-(--heading) xl:block"
            >
              {link.label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
