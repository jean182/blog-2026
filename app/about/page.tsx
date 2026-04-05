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
    <div className="mt-16 max-w-130">
      <div className="flex items-center gap-5 mb-10">
        <Image
          src="/profile-pic.jpg"
          alt="Jean Aguilar"
          width={80}
          height={80}
          className="rounded-full object-cover w-20 h-20"
        />
        <div>
          <h1 className="text-[24px] font-semibold text-(--heading)">Jean Aguilar</h1>
          <p className="text-[15px] text-(--muted) font-sans">Software engineer from Costa Rica</p>
        </div>
      </div>

      <p className="text-[17px] text-(--text) leading-relaxed">
        I'm a developer who spends too much time thinking about code and not enough time shipping it. Born and raised in Costa Rica, currently 29, increasingly aware that my body has an expiration date.
      </p>

      <p className="text-[17px] text-(--text) leading-relaxed mt-5">
        Outside of work I'm into physical media — 4K Blu-rays, CDs, vinyl — the kind of stuff that makes people ask "why don't you just stream it?" I watch football (the real one), follow basketball, drink Guinness, and have a sense of humor that most people describe as "a lot."
      </p>

      <h2 className="text-[20px] font-semibold text-(--heading) mt-12 mb-4">Why this blog</h2>

      <p className="text-[17px] text-(--text) leading-relaxed">
        I had a blog before. Stopped posting in 2021 and let it rot. This is the rebuild — done properly this time, or at least that's the plan. I want to write about code, maybe about movies or music I've discovered in the years I was quiet. We'll see if I actually follow through.
      </p>

      <h2 className="text-[20px] font-semibold text-(--heading) mt-12 mb-4">Elsewhere</h2>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-(--muted) font-sans transition-colors hover:text-(--heading)"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
