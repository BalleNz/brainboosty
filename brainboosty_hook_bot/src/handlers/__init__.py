from aiogram import Dispatcher

from brainboosty_hook_bot.src.handlers import (
    admin,
    channel_access,
    cognitive,
    common,
    menu,
    payments,
    questionnaire,
    referral,
    scheduled_tests,
    start,
)


def register_handlers(dp: Dispatcher) -> None:
    """Подключает роутеры. /start (в т.ч. site_<токен> для входа с сайта) — первым, иначе FSM анкеты/теста съест текст."""
    dp.include_router(start.router)
    dp.include_router(common.router)
    dp.include_router(admin.router)
    dp.include_router(payments.router)
    dp.include_router(channel_access.router)
    dp.include_router(scheduled_tests.router)
    dp.include_router(menu.router)
    dp.include_router(cognitive.router)
    dp.include_router(questionnaire.router)
    dp.include_router(referral.router)
