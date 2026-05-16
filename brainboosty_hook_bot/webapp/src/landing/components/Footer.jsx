export function Footer({ lang, meta }) {
  const isRu = lang === "ru";
  return (
    <footer className="border-t border-white/10 px-5 py-12 text-center text-sm text-white/50">
      <p className="lux-wordmark inline-block">brainboosty</p>
      <p className="mt-3">{isRu ? "Образовательная модель · не медицинский диагноз" : "Educational model · not medical advice"}</p>
      {meta?.channelUrl && (
        <a
          href={meta.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-pink-300 hover:text-neon-pink"
        >
          {isRu ? "Канал @androgenautist" : "Channel @androgenautist"}
        </a>
      )}
      <p className="mt-6 text-xs text-white/35">© {new Date().getFullYear()} BrainBoosty</p>
    </footer>
  );
}
