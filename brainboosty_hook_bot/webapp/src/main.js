import "./styles/cyber-neon.css";
import { bootApp } from "./app.js";
import { initTelegramWebApp } from "./telegram.js";

const { initData, user, lang } = initTelegramWebApp();
bootApp({ initData, user, lang });
