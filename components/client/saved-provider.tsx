"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { toggleSave } from "@/lib/actions/saved";

type SavedContextValue = {
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
  ready: boolean;
};

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    fetch("/api/saved/slugs")
      .then((r) => r.json())
      .then((d: { slugs?: string[] }) => {
        if (active) {
          setSlugs(new Set(d.slugs ?? []));
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const flip = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      // Optimistic flip, then reconcile with the server result.
      flip(slug);
      startTransition(async () => {
        try {
          const res = await toggleSave(slug);
          setSlugs((prev) => {
            const next = new Set(prev);
            if (res.saved) next.add(slug);
            else next.delete(slug);
            return next;
          });
        } catch {
          flip(slug); // revert
        }
      });
    },
    [flip],
  );

  return (
    <SavedContext.Provider
      value={{ isSaved: (s) => slugs.has(s), toggle, ready }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return ctx;
}
