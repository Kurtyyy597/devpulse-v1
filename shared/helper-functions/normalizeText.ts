export function normalizeText(text: string) {
  return text
    .normalize("NFKD") // normalize unicode
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ") // collapse multiple spaces
    .replace(/[^\w\s]/g, ""); // remove punctuation
};
