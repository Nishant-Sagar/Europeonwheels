"""Append-only record of every lead that reaches the API.

The in-memory list this used to rely on was wiped on every restart — and on
Render's free tier the instance restarts every time it spins down, so the only
lasting copy of a lead was the notification email.

This writes each lead to a JSONL file as well. Note the caveat: a free-tier
container has an ephemeral filesystem, so this only becomes genuinely durable
once LEAD_STORE_PATH points at a mounted persistent disk. `IS_DURABLE` reflects
that, and callers use it to decide whether a lead can be considered safe when
the notification channels are down.
"""

import json
import os
import threading
from pathlib import Path

# Set this to a path on a mounted disk (or any persistent volume) to make the
# lead log survive restarts and redeploys.
_configured_path = os.getenv("LEAD_STORE_PATH")

IS_DURABLE = bool(_configured_path)
STORE_PATH = Path(_configured_path or "data/leads.jsonl")

_lock = threading.Lock()


def append(record: dict) -> bool:
    """Append one record. Returns True if it hit the disk."""
    try:
        with _lock:
            STORE_PATH.parent.mkdir(parents=True, exist_ok=True)
            with STORE_PATH.open("a", encoding="utf-8") as fh:
                fh.write(json.dumps(record, ensure_ascii=False, default=str) + "\n")
                fh.flush()
                os.fsync(fh.fileno())
        return True
    except Exception as e:  # noqa: BLE001 — a failed write must never lose the request
        print(f"[storage] could not persist lead: {e}", flush=True)
        return False


def read_all() -> list[dict]:
    """Every record written so far. Malformed lines are skipped, not fatal."""
    if not STORE_PATH.exists():
        return []
    records = []
    try:
        with _lock, STORE_PATH.open("r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    records.append(json.loads(line))
                except json.JSONDecodeError:
                    continue
    except Exception as e:  # noqa: BLE001
        print(f"[storage] could not read lead store: {e}", flush=True)
    return records
