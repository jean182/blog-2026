import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 flex-1 text-center">
      <h1 className="text-6xl font-bold text-(--heading) mb-4">404</h1>
      <p className="text-xl text-(--muted) mb-8">
        Welcome to the void.
      </p>
      <Link
        href="/"
        className="text-(--link) underline underline-offset-4 hover:opacity-80 transition-opacity"
      >
        Return to safety
      </Link>
    </div>
  );
}
