import en from "./en.js";
import ru from "./ru.js";

const catalogs = { ru, en };

export function getStrings(lang) {
  return catalogs[lang === "en" ? "en" : "ru"] ?? ru;
}
