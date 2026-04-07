// Client-safe post utilities (no Node.js dependencies)

export const formatPostDate = (date: string, lang: string) => {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date;
  }

  const newDate = new Date(date);
  return newDate.toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function getPrimaryCategory(tags: string[] = []) {
  const normalizedTags = tags.map((tag) => tag.toLowerCase());

  const matches = (keywords: string[]) =>
    normalizedTags.some((tag) =>
      keywords.some((keyword) => tag.includes(keyword)),
    );

  if (matches(["music", "album", "song", "vinyl"])) {
    return "Music";
  }

  if (
    matches(["film", "cinema", "horror", "review", "books", "physical media"])
  ) {
    return "Film";
  }

  if (
    matches([
      "react",
      "redux",
      "redux-saga",
      "rails",
      "ruby",
      "api",
      "typescript",
      "javascript",
      "css",
      "testing",
      "jest",
      "enzyme",
      "frontend",
      "architecture",
      "android",
      "mobile development",
      "accessibility",
      "devops",
      "ci/cd",
      "heroku",
      "bitbucket",
      "documentation",
      "bootstrap",
      "aosp",
      "rooting",
      "custom roms",
      "state management",
      "web development",
    ])
  ) {
    return "Engineering";
  }

  return "Notes";
}
