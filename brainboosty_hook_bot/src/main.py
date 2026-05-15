"""
Точка входа BrainBoosty Hook Bot.

По умолчанию бот работает через **webhook** в контейнере `api` (FastAPI).
Polling — только для локальной отладки: TELEGRAM_UPDATE_MODE=polling

Docker (VPS): docker compose up api  (сервис `bot` не нужен)
"""

from __future__ import annotations

import asyncio
import logging
import sys

from brainboosty_hook_bot.src.bot_runtime import (
    create_bot_runtime,
    start_bot_runtime,
    stop_bot_runtime,
)
from brainboosty_hook_bot.src.config.config import settings

logger = logging.getLogger(__name__)


async def run_polling() -> None:
    runtime = create_bot_runtime()
    await start_bot_runtime(runtime)
    try:
        logger.info("Telegram: long polling (для продакшена используйте webhook + api)")
        await runtime.dp.start_polling(
            runtime.bot,
            allowed_updates=runtime.dp.resolve_used_update_types(),
        )
    finally:
        await stop_bot_runtime(runtime)


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )

    if settings.uses_telegram_webhook:
        print(
            "TELEGRAM_UPDATE_MODE=webhook — запускайте FastAPI (uvicorn / docker compose up api).\n"
            "Polling отключён: апдейты приходят POST на "
            f"{settings.telegram_webhook_url}",
            file=sys.stderr,
        )
        raise SystemExit(0)

    asyncio.run(run_polling())


if __name__ == "__main__":
    main()
