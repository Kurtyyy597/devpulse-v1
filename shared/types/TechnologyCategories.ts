export const technologyCategories = [
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "desktop",
  "database",
  "devops",
  "cloud",
  "testing",
  "tool",
  "design",
  "ai",
  "data-science",
  "security",
  "game-development",
  "language",
] as const;

export type TechnologyCategories = (typeof technologyCategories)[number];
