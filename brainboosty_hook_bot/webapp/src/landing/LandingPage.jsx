import { motion } from "framer-motion";
import { Hero } from "./components/Hero.jsx";
import { NeuralBackground } from "./components/NeuralBackground.jsx";
import { BrainZonesGrid } from "./components/BrainZonesGrid.jsx";
import { Section } from "./components/Section.jsx";
import { Testimonials } from "./components/Testimonials.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { HubLogin } from "./components/HubLogin.jsx";
import { Footer } from "./components/Footer.jsx";
import { THEME_SECTIONS } from "./data/brainZones.js";

/** Премиум лендинг: hero → зоны → темы → отзывы → тарифы → hub → footer */
export function LandingPage({
  lang,
  meta,
  hubStatus,
  hubError,
  onLogin,
  onCtaBot,
  onCtaLogin,
  onHeroVideoClick,
}) {
  return (
    <motion.div className="relative min-h-screen">
      <NeuralBackground />
      <Hero
        lang={lang}
        onCtaBot={onCtaBot}
        onCtaLogin={onCtaLogin}
        onHeroVideoClick={onHeroVideoClick}
      />
      <BrainZonesGrid lang={lang} />
      <motion.div className="mx-auto max-w-5xl space-y-16 px-5 py-8">
        {THEME_SECTIONS.map((section, i) => (
          <Section key={section.id} section={section} lang={lang} index={i} />
        ))}
      </motion.div>
      <Testimonials lang={lang} />
      <Pricing lang={lang} meta={meta} onLogin={onLogin} onAccess={() => { window.location.href = "/access"; }} />
      <HubLogin
        lang={lang}
        status={hubStatus}
        error={hubError}
        onLogin={onLogin}
        oidcConfigured={meta?.oidcConfigured}
      />
      <Footer lang={lang} meta={meta} />
    </motion.div>
  );
}
