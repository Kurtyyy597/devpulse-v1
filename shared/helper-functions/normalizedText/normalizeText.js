"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = normalizeText;
function normalizeText(text) {
    return text
        .normalize("NFKD") // normalize unicode
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ") // collapse multiple spaces
        .replace(/[^\w\s]/g, ""); // remove punctuation
}
;
//# sourceMappingURL=normalizeText.js.map