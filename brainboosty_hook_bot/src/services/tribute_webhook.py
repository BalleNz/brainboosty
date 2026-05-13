"""Проверка подписи Tribute (trbt-signature, HMAC-SHA256 тела) и разбор события."""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
from typing import Any

logger = logging.getLogger(__name__)


def verify_tribute_signature(raw_body: bytes, secret: str, signature_header: str | None) -> bool:
    """
    Документация: https://wiki.tribute.tg/for-content-creators/api-documentation/webhooks
    Заголовок trbt-signature — HMAC-SHA256 от сырого тела, ключ — API key.
    """
    if not secret or not signature_header:
        return False
    sig = signature_header.strip()
    if sig.lower().startswith("sha256="):
        sig = sig[7:].strip()
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    try:
        return hmac.compare_digest(expected.lower(), sig.lower())
    except Exception:  # noqa: BLE001
        return False


def _walk_find_telegram_id(obj: Any) -> int | None:
    """Эвристический поиск Telegram user id в JSON вебхука."""
    keys = {
        "telegram_user_id",
        "telegram_id",
        "telegramid",
        "tg_id",
        "telegram_userid",
        "userid",
    }
    if isinstance(obj, dict):
        for k, v in obj.items():
            lk = str(k).lower().replace("-", "_")
            if lk in keys and isinstance(v, int) and v > 0:
                return v
            if lk in keys and isinstance(v, str) and v.isdigit():
                return int(v)
        for v in obj.values():
            found = _walk_find_telegram_id(v)
            if found is not None:
                return found
    elif isinstance(obj, list):
        for item in obj:
            found = _walk_find_telegram_id(item)
            if found is not None:
                return found
    return None


def parse_tribute_grant_kind(
    raw_json: dict[str, Any],
    *,
    product_id_month: str = "",
    product_id_forever: str = "",
) -> tuple[int | None, str | None]:
    """
    Возвращает (telegram_user_id, 'month'|'forever'|None).
    При заданных TRIBUTE_PRODUCT_ID_* в конфиге сверяем вхождение id в JSON.
    """
    tg_id = _walk_find_telegram_id(raw_json)
    blob = json.dumps(raw_json, ensure_ascii=False)
    b = blob.lower()

    if product_id_forever and product_id_forever in blob:
        return tg_id, "forever"
    if product_id_month and product_id_month in blob:
        return tg_id, "month"

    if any(k in b for k in ("навсегда", "forever", "lifetime")):
        return tg_id, "forever"
    if "2490" in b or "3990" in b or "3900" in b:
        return tg_id, "forever"
    if "790" in b or "пробн" in b or "trial" in b:
        return tg_id, "month"
    if "месяц" in b and "навсегда" not in b:
        return tg_id, "month"

    logger.warning("Tribute webhook: не удалось определить тип продукта, выдача доступа пропущена")
    return tg_id, None
