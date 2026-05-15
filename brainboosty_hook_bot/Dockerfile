# BrainBoosty Hook Bot — образ для сервисов `bot` и `api` (общий слой зависимостей).
FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/workspace

WORKDIR /workspace/brainboosty_hook_bot

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && python -m playwright install-deps \
    && python -m playwright install chromium \
    && rm -rf /var/lib/apt/lists/*

COPY . .

# По умолчанию — бот; в compose переопределяется для `api`.
CMD ["python", "-m", "brainboosty_hook_bot.src.main"]
