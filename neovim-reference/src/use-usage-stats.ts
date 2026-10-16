import { LocalStorage } from "@raycast/api";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NeovimCommand } from "./types";

const STORAGE_KEY = "usage-counts";

export type UsageCounts = Record<string, number>;

// Ключ счётчика: режим + команда
export function usageKey(item: Pick<NeovimCommand, "mode" | "command">): string {
  return `${item.mode}:${item.command}`;
}

export function useUsageStats() {
  const [counts, setCounts] = useState<UsageCounts>({});
  const countsRef = useRef<UsageCounts>({});

  useEffect(() => {
    LocalStorage.getItem<string>(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      try {
        // Мержим с тем, что успело накопиться до завершения загрузки
        const stored = JSON.parse(raw) as UsageCounts;
        const merged = { ...stored };
        for (const [key, value] of Object.entries(countsRef.current)) {
          merged[key] = (stored[key] ?? 0) + value;
        }
        countsRef.current = merged;
        setCounts(merged);
      } catch {
        // Повреждённые данные игнорируем, счётчики начнутся с нуля
      }
    });
  }, []);

  const increment = useCallback((item: Pick<NeovimCommand, "mode" | "command">) => {
    const key = usageKey(item);
    const next = { ...countsRef.current, [key]: (countsRef.current[key] ?? 0) + 1 };
    countsRef.current = next;
    setCounts(next);
    LocalStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  return { counts, increment };
}
