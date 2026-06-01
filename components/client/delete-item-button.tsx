"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteItem } from "@/lib/actions/moodboard";

export function DeleteItemButton({
  projectId,
  itemId,
}: {
  projectId: string;
  itemId: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await deleteItem(projectId, itemId);
          router.refresh();
        })
      }
      className="text-xs text-muted transition-colors hover:text-accent disabled:opacity-50"
      aria-label="Remove item"
    >
      Remove
    </button>
  );
}
